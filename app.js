const express = require('express'),
    app = express(),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    router = express.Router();

const { Sequelize, Model, DataTypes, Op } = require('sequelize');

const sequelize = require('./models/sqlize');
const HourlySummary = require('./models/hourly_summary');
const DailySummary = require('./models/daily_summary');
const WxMeasurement = require('./models/wxmeasr');
const port = parseInt(process.env.PORT);

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.redirect('/currently');
});

app.get('/currently', (req, res) => {
    const sql = `select AMBIENT_TEMPERATURE, GROUND_TEMPERATURE,
    AIR_QUALITY, AIR_PRESSURE, HUMIDITY, WIND_DIRECTION, WIND_SPEED,
    WIND_GUST_SPEED, WIND_CHILL, HEAT_IDX, DEW_PT, CPU_TEMP, CREATED, 
    DATE(wm.CREATED) dateMeasured, 
    (select sum(RAINFALL) from WEATHER_MEASUREMENT
        where date(CREATED) = date(wm.CREATED)) totalRain
    from WEATHER_MEASUREMENT wm
    order by wm.CREATED desc
    limit 1`;

    // gets current observations
    sequelize.query(sql,
        {
            type: sequelize.QueryTypes.SELECT,
            model: WxMeasurement,
            mapToModel: true,
            raw: true
        }
    ).then(data => {

        jsonData = {
            currently: data[0]
        }

        res.status(200).send(jsonData);

    }).catch(err => {
        res.status(500).send({error: err.message});
    });

});

app.get('/daily', (req, res) => {
    console.log(req.headers);
    let currentDate = new Date();
    let numDays = 1;

    if(req.headers.date) {
        console.log('got a date');
        currentDate = new Date(req.headers.date);
    }

    if(req.headers.days) {
        console.log('got numDays');
        numDays = parseInt(req.headers.days);
    }
    
    const sDate = `${currentDate.getFullYear()}/` + 
        `${currentDate.getMonth() + 1}/` + 
        `${currentDate.getDate()}`;
    console.log(currentDate.toDateString());

    sequelize.query(`CALL DAILY_SUMMARY(:currentdate, :numdays); `, {
        replacements: {
            currentdate: sDate,
            numdays: numDays
        },
        type: sequelize.QueryTypes.RAW,
    }).then(data => {
        
        const jsonData = {
            length: data.length,
            daily: data
        }

        res.status(200).send(jsonData);
    }).catch(err => {
        console.error('Error :\n', err.message);
        res.status(500).send({error: err.message});
    });   

});

app.get('/hourly', (req, res) => {
    console.log(req.headers);
    let currentDate;
    if(req.headers.date) {
        console.log('got date');
        currentDate = new Date(req.headers.date);
        console.log(currentDate);
    } else {
        console.log('new date');
        currentDate = new Date();
    }
    
    const criteria = {
        where: sequelize.where(
            sequelize.fn(
                'DATE', 
                sequelize.col('CREATED')
            ), 
            sequelize.fn(
                'DATE',
                currentDate.toISOString()
            )
        ),
        type: sequelize.QueryTypes.SELECT,
        mapToModel: true,
        raw: true
    }

    // gets current day summary for each hour of the day
    HourlySummary.findAll(criteria).then(hourlyData => {
        jsonData = {
            hourly: hourlyData
        }
        res.status(200).send(jsonData);
    }).catch(err => {
        res.status(500).send({error: err.message});
    });
});

// current weather conditions route
app.get('/weathersummary', (req, res) => {
    let jsonData;
    const endDate = new Date();
    const numDays = 1;  

    const sDate = `${endDate.getFullYear()}/` + 
        `${endDate.getMonth() + 1}/` + 
        `${endDate.getDate()}`;

    sequelize.query(`CALL WEATHER_JSON(:enddate, :numdays); `, {
        replacements: {
            enddate: sDate,
            numdays: numDays
        },
        type: sequelize.QueryTypes.RAW,
    }).then(data => {
        const output = data[0];
        const currently = output['currently'];
        const daily = output['daily'];
        const hourly = output['hourly'];
        
        jsonData = {
            currently: JSON.parse(currently),
            daily: JSON.parse(daily),
            hourly: JSON.parse(hourly)
        }

        res.status(200).send(jsonData);
    }).catch(err => {
        console.error('Error :\n', err.message);
        res.status(500).send({error: err.message});
    });   
});

// Movie route
// app.get('/movie/:id', (req, res) => {
//     DbMovies.findOne({
//         where: {film_id: req.params.id}
//     }).then(movie => {
//         const data = movie
//         res.status(200).send(data);
//     }).catch(err => {
//         console.log(`error: ${err.message}`);
//         res.status(500).send({});
//     });
// });

// search route
// app.get('/search', (req, res) => {
//     console.log(req.headers);
//     const fields = [
//         {name: 'title', field: 'title', match: Op.substring}, 
//         {name: 'rel_yr', field: 'release_year', match: Op.eq}, 
//         {name: 'desc', field: 'description', match: Op.substring}
//     ];

//     let criteria = {where: {}};

//     for(const field of fields){
//         if(req.headers[field.name]){
//             criteria = {
//                 where: {
//                     ...criteria.where,
//                     [field.field]: {[field.match]: req.headers[field.name]}
//                 }
//             };
//         }
//     }
    
//     console.log(criteria);

//     DbMovies.findAll(criteria).then(movies => {
//         const data = {
//             length: movies.length,
//             movies: movies
//         }
//         res.status(200).send(data);
//     }).catch(err => {
//         console.log(`Error: ${err.message}`);
//         res.status(500).send({});
//     });
// });

// listener
const apiPort = port || 3000;
app.listen(apiPort, (req, res) => {
    console.log(`Weather-API Listening on port ${apiPort}...`);
});