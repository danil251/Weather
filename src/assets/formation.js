

export const formation = {
    formTemp(temp, cOrF) {
        if (cOrF === 'f') {
            return Math.round((temp - 273.15)* 9/5 + 32)
        }
        if (cOrF === 'c') {
            return Math.round(temp - 273.15)
        }
    },
    formWind(speed, deg) {
        const s = speed + 'м/с,'
        if (330 < deg || deg < 30) {
            return s + ' северный'
        } else if (30< deg && deg < 60) {
            return s + ' северо-восточный'
        } else if (60< deg && deg < 120) {
            return s + ' восточный'
        } else if (120< deg && deg < 150) {
            return s + ' юго-восточный'
        } else if (150< deg && deg < 210) {
            return s + ' южный'
        } else if (210< deg && deg < 240) {
            return s + ' юго-западный'
        } else if (240< deg && deg < 300) {
            return s + ' западный'
        } else if (300< deg && deg < 330) {
            return s + ' северо-западный'
        }
    }
}

