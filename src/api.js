import { sanitizeData } from "./utils";

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'crypto-tracker.p.rapidapi.com',
        'X-RapidAPI-Key': 'e48780df5dmsh42add58f5278c98p1c6c9fjsnf157b75eef6e'
    }
};


const removeLeadingZeroes = price => '$' + parseInt(price.split('$')[1], 10)
const fixedTwoDigits = percent => parseInt(percent.split('%')[0], 10) + '%'

const reShapeData = (data) => {
    let reshapedData = data.map(({ name, onedaychange, price }, index) => (
        { id: index, items: Object.values({ name, price: removeLeadingZeroes(sanitizeData(price)), percent: fixedTwoDigits(onedaychange) }) }))
    return reshapedData
}


export const callAPI = async (url) => {
    try {
        const data = await fetch(`https://crypto-tracker.p.rapidapi.com/api/${url}`, options)
        let response = await data.json()
        let res = reShapeData(response?.result)
        return res;
    }

    catch (err) {
        throw new Error(err)
    }
}

export const getAPIData = (pageNum) => {
    switch (pageNum) {
        case 1:
            return callAPI('recentlyadded')
        case 2:
            return callAPI('mostvisited')
        case 3:
            return callAPI('toplosers')
        case 4:
            return callAPI('trending')
        case 5:
            return callAPI('top10')

        default:
            break;
    }
}

