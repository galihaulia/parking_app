require('dotenv').config()
const moment = require('moment')

var cars = [
  {
    carNumber: 'B123AB',
    color: 'HITAM',
    type: 'SUV',
    enterDate: '2021-07-07 11:18:14',
  },
  {
    carNumber: 'B123BG',
    color: 'HITAM',
    type: 'SUV',
    enterDate: '2021-07-08 11:18:14',
  },
  {
    carNumber: 'B123BH',
    color: 'KUNING',
    type: 'MPV',
    enterDate: '2021-07-09 11:18:14',
  },
  {
    carNumber: 'B123IC',
    color: 'MERAH',
    type: 'SUV',
    enterDate: '2021-07-10 11:18:14',
  },
  {
    carNumber: 'B123BS',
    color: 'MERAH',
    type: 'MPV',
    enterDate: '2021-07-10 11:18:14',
  },
]

exports.carEnter = (req, res, next) => {
  const now = moment().format('YYYY-MM-DD HH:mm:ss')
  const { plat_nomor, warna, tipe } = req.body

  const floor = [1, 2, 3, 4, 5]
  const block = ['A', 'B', 'C', 'D']

  const temp = plat_nomor.toUpperCase().split(' ')
  let plat = temp.reduce((accumulator, currentValue, index) => {
    return (accumulator ? accumulator : accumulator) + currentValue
  })

  try {
    let parking_lot =
      `${block[Math.floor(Math.random() * block.length)]}` +
      `${floor[Math.floor(Math.random() * floor.length)]}`

    let car = {
      carNumber: plat,
      color: warna.toUpperCase(),
      type: tipe.toUpperCase(),
      enterDate: now,
    }
    cars.push(car)

    console.log(cars)
    return res.jsend.success({
      plat_nomor: plat_nomor,
      parking_lot: parking_lot,
      tanggal_masuk: now,
    })
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
    // let findCar = null;
    // const findCar = cars.find((current) => current.carNumber == plat);
    // cars.find((current, index) => {
    //   if (current.carNumber == plat) {
    //     let obj = {
    //       id: index,
    //       carNumber: current.carNumber,
    //       color: current.color,
    //       enterDate: current.enterDate,
    //       type: current.type,
    //     };

    //     findCar = obj;
    //   }
    // });

    const findCar = cars.find((current, index) => {
      if (current.carNumber == plat) {
        delete cars[index]
        return current
      }
    })

    if (findCar) {
      let tgl_aw = moment(findCar.enterDate)
      let tgl_ak = moment(now)
      let hours
      let pay

      switch (findCar.type) {
        case 'SUV':
          hours = tgl_ak.diff(tgl_aw, 'hours')
          pay = hours * 25000
          break

        case 'MPV':
          hours = tgl_ak.diff(tgl_aw, 'hours')
          pay = hours * 35000
          break

        default:
          break
      }

      console.log(cars)

      let data = {
        plat_nomor: plat_nomor,
        tanggal_masuk: findCar.enterDate,
        tanggal_keluar: now,
        jumlah_bayar: pay,
      }

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
    return res.jsend.success(data)
  } catch (error) {
    return res.status(400).jsend.error({
      message: 'Failed! type not found',
    })
  }
}
