import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const horarios = [
    { dia: 'Lunes', hora: '8:00' },
    { dia: 'Lunes', hora: '10:00' },
    { dia: 'Lunes', hora: '12:00' },
    { dia: 'Lunes', hora: '14:00' },
    { dia: 'Martes', hora: '14:00' },
    { dia: 'Martes', hora: '16:00' },
    { dia: 'Miércoles', hora: '09:00' },
    { dia: 'Miércoles', hora: '12:00' },
    { dia: 'Miércoles', hora: '13:00' },
    { dia: 'Miércoles', hora: '16:00' },
    { dia: 'Jueves', hora: '8:00' },
    { dia: 'Jueves', hora: '9:00' },
    { dia: 'Jueves', hora: '16:00' },
    { dia: 'Jueves', hora: '17:00' },
    { dia: 'Viernes', hora: '11:00' },
    { dia: 'Viernes', hora: '12:00' },
    { dia: 'Viernes', hora: '14:00' },
  ]

  for (const h of horarios) {
    await prisma.horario.create({
      data: {
        dia: h.dia,
        hora: h.hora
      }
    })
  }

  console.log('Horarios insertados')
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e)
    prisma.$disconnect()
    process.exit(1)
  })
