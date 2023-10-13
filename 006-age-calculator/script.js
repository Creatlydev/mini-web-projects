function getAge (birthdate) {
  const now = new Date()
  const objBirthdate = new Date(birthdate)
  const timeDiff = now - objBirthdate
  // Se obtiene el equivalente de timeDiff que son milissegundos en dias
  let days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
  const years = Math.floor(days / 365)
  const daysLeft = getDaysLeft(now, objBirthdate)
  const months = ('0' + Math.floor(daysLeft / 30.4).toString()).slice(-2)
  days = ('0' + Math.round(daysLeft % 30.4).toString()).slice(-2)
  return { days, months, years }
}

/**
 * Calcula los días restantes desde la última fecha de cumpleaños (aniversario).
 *
 * @param {Date} now - La fecha actual.
 * @param {Date} birthdate - La fecha de cumpleaños.
 * @returns {number} - El número de días transcurridos desde el último aniversario.
 *
 * FORMULA PARA OBTENER LOS DIAS
 * primero: obtengo la cantidad de dias del mes de aniversario y le resto el dia del aniversario, para obtener los dias transcurridos en ese mes y a esto le sumo los dias que se llevan en el mes actual, todo esto lo almaceno en una variable daysLeft
 *
 * segundo: verifico si el mes actual es mayor al mes de aniversario.
*       -> si es cierto entonces:
*            a la variable daysLeft se le suma la multiplicacion del aproximado de dias de un mes * la (resta del mes actual - (mes de aniversario + 1 porque ya se sumo los dias transcurridos en ese mes por eso suma 1 para pasar al siguiente mes))
*            La formula completa para este caso quedaria asi:
*            daysLeft = diasDelMesDeAniversario - diasAniversario + diasEnMesActual
*            daysLeft += (mesActual - (mesAniversario + 1)) * 30.4 <<
*       -> caso contrario:
*            al numero 11 que corresponde al ultimo mes del año contando desde 0 se le resta el mes de aniversario y se le suma el mes actual y esto al final se multiplica por el aproximado de dias en un mes
*           La formula para este caso quedaria asi:
*           daysLeft = diasDelMesDeAniversario - diasAniversario + diasEnMesActual
*           daysLeft += (11 - mesAniversario + mesActual) * 30.4
 */
function getDaysLeft (now, birthdate) {
  const nowMonth = now.getMonth()
  const birthMonth = birthdate.getMonth()
  const nowDay = now.getDate()
  const birthDay = birthdate.getDate()

  // Si el mes del cumpleaños a sido en el mes actual, los dias restantes seria el resultado del dia actual - el dia del cumpleaños
  if (nowMonth === birthMonth && nowDay > birthDay) return nowDay - birthDay

  const daysLeft = getDaysInMonth(birthMonth) - birthDay + nowDay

  if (nowMonth > birthMonth) return daysLeft + Math.round((nowMonth - (birthMonth + 1)) * 30.4)
  return daysLeft + Math.round((11 - birthMonth + nowMonth) * 30.4)
}

// Devuelve la cantidad de dias que tiene el mes especificado
function getDaysInMonth (indexMes) {
  return new Date(new Date().getFullYear(), indexMes + 1, 0).getDate()
}

function showAge (birthdate, elem) {
  const age = getAge(birthdate)
  const ele = document.getElementById(elem)
  ele.querySelector('.years').innerHTML = age.years
  ele.querySelector('.months').innerHTML = age.months
  ele.querySelector('.days').innerHTML = age.days
}

const inputDate = document.querySelector('.field__input')

inputDate.addEventListener('keyup', (event) => {
  console.log(inputDate.value)
  if (event.key === 'Enter') {
    showAge(inputDate.value, 'age')
  }
})
showAge(inputDate.value, 'age')
