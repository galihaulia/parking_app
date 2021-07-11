require('dotenv').config()
const moment = require('moment')

var cars = [
  {
    id: 1,
    carNumber: 'B123AB',
    color: 'HITAM',
    type: 'SUV',
    enterDate: '2021-07-07 11:18:14',
    lostsId: 1,
  },
  {
    id: 2,
    carNumber: 'B123BG',
    color: 'HITAM',
    type: 'SUV',
    enterDate: '2021-07-08 11:18:14',
    lostsId: 2,
  },
  {
    id: 3,
    carNumber: 'B123BH',
    color: 'KUNING',
    type: 'MPV',
    enterDate: '2021-07-09 11:18:14',
    lostsId: 3,
  },
  {
    id: 4,
    carNumber: 'B123IC',
    color: 'MERAH',
    type: 'SUV',
    enterDate: '2021-07-10 11:18:14',
    lostsId: 4,
  },
  {
    id: 5,
    carNumber: 'B123BS',
    color: 'MERAH',
    type: 'MPV',
    enterDate: '2021-07-10 11:18:14',
    lostsId: 5,
  },
]

var lots = [
  {
    id: 1,
    name: 'A1',
    status: 'available',
  },
  {
    id: 2,
    name: 'A2',
    status: 'available',
  },
  {
    id: 3,
    name: 'A3',
    status: 'available',
  },
  {
    id: 4,
    name: 'A4',
    status: 'available',
  },
  {
    id: 5,
    name: 'A5',
    status: 'available',
  },
  {
    id: 6,
    name: 'B1',
    status: 'unavailable',
  },
  {
    id: 7,
    name: 'B2',
    status: 'unavailable',
  },
  {
    id: 8,
    name: 'B3',
    status: 'unavailable',
  },
  {
    id: 9,
    name: 'B4',
    status: 'unavailable',
  },
  {
    id: 10,
    name: 'B5',
    status: 'unavailable',
  },
]

exports.carEnter = (req, res, next) => {
  const now = moment().format('YYYY-MM-DD HH:mm:ss')
  const { plat_nomor, warna, tipe } = req.body

  // const floor = [1, 2, 3, 4, 5]
  // const block = ['A', 'B', 'C', 'D']

  const temp = plat_nomor.toUpperCase().split(' ')
  let plat = temp.reduce((accumulator, currentValue, index) => {
    return (accumulator ? accumulator : accumulator) + currentValue
  })

  try {
    // let parking_lot =
    //   `${block[Math.floor(Math.random() * block.length)]}` +
    //   `${floor[Math.floor(Math.random() * floor.length)]}`

    const findLot = lots.filter((current) => current.status == 'unavailable')

    if (findLot) {
      let car = {
        id: cars.length + 1,
        carNumber: plat,
        color: warna.toUpperCase(),
        type: tipe.toUpperCase(),
        enterDate: now,
        lotsId: findLot[0].id,
      }
      cars.push(car)
      findLot[0].status = 'available'

      console.log(cars)
      console.log(lots)
      return res.jsend.success({
        plat_nomor: plat_nomor,
        parking_lot: findLot[0].name,
        tanggal_masuk: now,
      })
    }
  } catch (error) {
    return res.status(400).jsend.error({
      message: 'Failed! Full Parking Lot',
    })
  }
}

exports.carOut = (req, res, next) => {
  const now = moment().format('YYYY-MM-DD HH:mm:ss')
  const { plat_nomor } = req.query

  const temp = plat_nomor.toUpperCase().split(' ')
  let plat = temp.reduce((accumulator, currentValue, index) => {
    return (accumulator ? accumulator : accumulator) + currentValue
  })

  try {
    const findCar = cars.filter((current, index) => {
      if (current.carNumber == plat) {
        delete cars[index]
        return current
      }
    })
    console.log(findCar[0].lotsId)
    const findLot = lots.filter((current) => current.id == findCar[0].lotsId)

    if (findCar.length > 0) {
      findLot[0].status = 'unavailable'

      let tgl_aw = moment(findCar[0].enterDate)
      let tgl_ak = moment(now)
      let hours, temp, payAfter, pay

      switch (findCar[0].type) {
        case 'SUV':
          hours = tgl_ak.diff(tgl_aw, 'hours')
          temp = hours - 1
          payAfter = 25000 * (20 / 100)
          pay = 25000 + temp * (25000 - payAfter)
          break

        case 'MPV':
          hours = tgl_ak.diff(tgl_aw, 'hours')
          temp = hours - 1
          payAfter = 35000 * (20 / 100)
          pay = 35000 + temp * (35000 - payAfter)
          break

        default:
          break
      }

      let data = {
        plat_nomor: plat_nomor,
        tanggal_masuk: findCar[0].enterDate,
        tanggal_keluar: now,
        jumlah_bayar: pay,
      }

      console.log(cars)
      console.log(lots)
      return res.jsend.success(data)
    } else {
    }
  } catch (error) {
    return res.status(400).jsend.error({
      message: 'Failed! vehicle not found',
    })
  }
}

exports.carList = (req, res, next) => {
  const { warna } = req.query

  const findCar = cars.filter(
    (current) => current.color === warna.toUpperCase(),
  )

  if (findCar) {
    let plat_nomor = []
    findCar.map((car) => {
      plat_nomor.push(car.carNumber)
    })
    let data = {
      plat_nomor: plat_nomor,
    }

    console.log(cars)
    console.log(lots)
    return res.jsend.success(data)
  } else {
    return res.status(400).jsend.error({
      message: 'Failed! color not found',
    })
  }
}

exports.carReport = (req, res, next) => {
  const { tipe } = req.query

  try {
    const sumCar = cars.filter(
      (current) => current.type === tipe.toUpperCase(),
    ).length
    let data = {
      jumlah_kendaraan: sumCar,
    }

    console.log(cars)
    console.log(lots)
    return res.jsend.success(data)
  } catch (error) {
    return res.status(400).jsend.error({
      message: 'Failed! type not found',
    })
  }
}
