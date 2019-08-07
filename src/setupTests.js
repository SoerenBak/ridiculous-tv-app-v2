import '@testing-library/react';
import 'jest-dom/extend-expect';
global.categoriesTestData = [

   {
        "_id": "5d496e1adca8e229ec149cd5",
        "title": "Sport",
        "__v": 0
    },
    {
        "_id": "5d496e20dca8e229ec149cd6",
        "title": "News",
        "__v": 0
    },
    {
        "_id": "5d496e3ddca8e229ec149cda",
        "title": "Movies",
        "__v": 0
    }
]

global.programsTestData = [
    {
        "_id": "5d49d6e0cb58d00e806730c1",
        "title": "19 Nyhederne på TV2",
        "description": "Hvad sker der i verden lige nu? Få seneste nyheder fra både Danmark og resten af Europa og verden. Breaking News får du først og skarpest her ",
        "category": "News",
        "channel": "TV2",
        "schedule": "19:00 - 19:30",
        "poster": "sbp",
        "__v": 0
    },
    {
        "_id": "5d49d705cb58d00e806730c2",
        "title": "21 Nyhederne på TV2",
        "description": "Hvad sker der i verden lige nu? Få seneste nyheder fra både Danmark og resten af Europa og verden. Breaking News får du først og skarpest her ",
        "category": "News",
        "channel": "TV2",
        "schedule": "21:30 - 22:00",
        "poster": "sbp",
        "__v": 0
    }
]

global.channelsTestData = [
    
    {
        "_id": "5d4953d397c9dc194ca6b8fd",
        "channel": "DR1",
        "__v": 0
    },
    {
        "_id": "5d4953d897c9dc194ca6b8fe",
        "channel": "TV2",
        "__v": 0
    },
    {
        "_id": "5d496f32dca8e229ec149cdf",
        "channel": "DR2",
        "__v": 0
    }
]