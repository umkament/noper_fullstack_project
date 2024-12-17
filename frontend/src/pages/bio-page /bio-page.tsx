// import React from 'react'

// import NOPER from '@/assets/NOPER.png'
// import bio1 from '@/assets/bio/bio1.jpg'
// import bio2 from '@/assets/bio/bio2.jpg'
// import { Card } from '@/components/ui/card'
// import { Typography } from '@/components/ui/typography'

// import s from './bio-page.module.scss'

// export const BioPage: React.FC = () => {
//   return (
//     <div className={s.container}>
//       <Card className={s.card}>
//         <img alt={'bio1'} className={s.imgBio} src={bio1} />
//       </Card>
//       <Card className={s.card}>
//         <Typography>
//           CHRISTINA ROMANOVA FRONTEND-DEVELOPER I'm frontend developer with experience in creating
//           SPA using React, Redux, TypeScript. Knowledge in user interface, testing, and debugging
//           processes. I improving my skills in this direction. Open to your suggestions.
//         </Typography>
//       </Card>
//       <img alt={'logo'} className={s.logo} src={NOPER} />
//       <Card className={s.card}>
//         Starting from 2021, I became interested in the field of frontend development. I began to
//         learn the fundamentals of layout and programming through JavaScript. Subsequently, I
//         enrolled in IT-incubator for training, where I continued to delve into this field and got
//         acquainted with frameworks such as React/Redux. I believe that a good programmer is always
//         in a state of learning and deepening their knowledge, which is what I am currently engaged
//         in. I participated in the development of projects such as creating cards for a note-taking
//         app, which involves sorting and filtering based on specified conditions. Additionally, I was
//         involved in a project focused on education and also took part in developing a section of an
//         application that represents a social network (authorization, pagination, CRUD operations,
//         working with Redux actions (thunks) More information about projects you can be found in
//         GitHub
//       </Card>
//       <Card className={s.card}>
//         <img alt={'bio1'} className={s.imgBio} src={bio2} />
//       </Card>
//       <Card className={s.card}>
//         телефон +7-927-255-0309 почта umkament@gmail.com telegram @umkament работа удаленно,
//         рассматриваю предложения по релокации
//       </Card>
//     </div>
//   )
// }

import React from 'react'

import NOPER from '@/assets/NOPER.png'
import bio1 from '@/assets/bio/bio1.jpg'
import bio2 from '@/assets/bio/bio2.jpg'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

import s from './bio-page.module.scss'

export const BioPage: React.FC = () => {
  return (
    <div className={s.container}>
      <Card className={s.card}>
        <img alt={'bio1'} className={s.imgBio} src={bio1} />
      </Card>
      <Card className={s.card}>
        <Typography className={s.text}>
          <strong>CHRISTINA ROMANOVA</strong>
        </Typography>
        <Typography className={s.text}>
          <span className={s.profession}>Frontend Developer</span>
        </Typography>
        <Typography className={s.text}>
          I'm a frontend developer with experience in creating SPA using <strong>React</strong>,{' '}
          <strong>Redux</strong>, and <strong>TypeScript</strong>. Knowledge in user interface,
          testing, and debugging processes. I'm constantly improving my skills in this direction.
          Open to your suggestions.
        </Typography>
      </Card>
      <img alt={'logo'} className={s.logo} src={NOPER} />
      <Card className={s.card}>
        <Typography className={s.text}>
          Starting from <strong>2021</strong>, I became interested in the field of frontend
          development. I began to learn the fundamentals of layout and programming through{' '}
          <strong>JavaScript</strong>. Subsequently, I enrolled in an IT-incubator for training,
          where I continued to delve into this field and got acquainted with frameworks such as{' '}
          <strong>React</strong> and <strong>Redux</strong>.
        </Typography>
        <Typography className={s.text}>
          I believe that a good programmer is always in a state of learning and deepening their
          knowledge, which is what I am currently engaged in.
        </Typography>
        <Typography className={s.text}>
          I participated in the development of projects such as creating cards for a note-taking
          app, which involves sorting and filtering based on specified conditions. Additionally, I
          was involved in a project focused on education and also took part in developing a section
          of an application that represents a social network (authorization, pagination, CRUD
          operations, working with Redux actions (thunks)).
        </Typography>
        <Typography className={s.text}>
          More information about my projects can be found on my{' '}
          <a href={'https://github.com/umkament'} rel={'noopener noreferrer'} target={'_blank'}>
            GitHub
          </a>
          .
        </Typography>
      </Card>
      <Card className={s.card}>
        <img alt={'bio2'} className={s.imgBio} src={bio2} />
      </Card>
      <Card className={s.card}>
        <Typography className={s.text}>
          <strong>Contact Information:</strong>
        </Typography>
        <Typography className={s.text}>
          <strong>Phone:</strong> +7-927-255-0309
        </Typography>
        <Typography className={s.text}>
          <strong>Email:</strong> umkament@gmail.com
        </Typography>
        <Typography className={s.text}>
          <strong>Telegram:</strong> @umkament
        </Typography>
        <Typography className={s.text}>
          <strong>Work:</strong> Remote, considering relocation offers.
        </Typography>
      </Card>
    </div>
  )
}
