// import React from 'react'

// import NOPER from '@/assets/NOPER.png'
// import { Card } from '@/components/ui/card'
// import { Typography } from '@/components/ui/typography'

// import s from './concept-page.module.scss'

// export const ConceptPage: React.FC = () => {
//   return (
//     <div className={s.container}>
//       <Card className={s.card}>
//         <Typography>
//           Nothing Personal — платформа для открытого общения и обмена идеями. Здесь каждый может
//           публиковать свои статьи и оставлять комментарии к постам других пользователей, чтобы
//           делиться мыслями, обсуждать актуальные темы и получать обратную связь от сообщества. Сайт
//           не поддерживает личные сообщения, а все общение происходит исключительно в комментариях
//           под публикациями. Мы придерживаемся философии "ничего личного": каждый пользователь может
//           свободно делиться своими взглядами, оставаясь при этом в рамках общего обсуждения. Наши
//           правила поощряют открытость и уважительное отношение, делая общение конструктивным и
//           ненавязчивым. Присоединяйтесь к Nothing Personal, чтобы общаться без лишних границ и
//           сосредоточиться на самых интересных темах, а не на личных вопросах.
//         </Typography>
//       </Card>
//       <img alt={'logo'} className={s.logo} src={NOPER} />
//       <Card className={s.card}>
//         <Typography>
//           "Nothing Personal" is a unique publishing platform where users are invited to share
//           articles and engage in thoughtful discussions through comments on each other’s posts.
//           Embracing an open and transparent communication philosophy, the site deliberately avoids
//           private messaging, ensuring all exchanges remain public and centered solely around shared
//           content. This structure fosters a focused, topic-driven community while preventing
//           unrelated or private dialogue, aligning with the platform’s guiding principle of "nothing
//           personal." Whether users seek to present perspectives, provide constructive feedback, or
//           join in public discussions, "Nothing Personal" ensures a collaborative environment where
//           every interaction contributes to a meaningful and collective experience, all within an
//           atmosphere of openness and integrity.
//         </Typography>
//       </Card>
//     </div>
//   )
// }

import React from 'react'

import NOPER from '@/assets/NOPER.png'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

import s from './concept-page.module.scss'

export const ConceptPage: React.FC = () => {
  return (
    <div className={s.container}>
      <Card className={s.card}>
        <Typography className={s.text}>
          <strong>Nothing Personal</strong> — платформа для открытого общения и обмена идеями. Здесь
          каждый может публиковать свои статьи и оставлять комментарии к постам других
          пользователей, чтобы делиться мыслями, обсуждать актуальные темы и получать обратную связь
          от сообщества.
        </Typography>
        <Typography className={s.text}>
          Сайт не поддерживает <strong>личные сообщения</strong>, а всё общение происходит
          исключительно в комментариях под публикациями. Мы придерживаемся философии
          <em> "ничего личного" </em>: каждый пользователь может свободно делиться своими взглядами,
          оставаясь в рамках общего обсуждения.
        </Typography>
        <Typography className={s.text}>
          Наши правила поощряют <strong>открытость</strong> и{' '}
          <strong>уважительное отношение</strong>, делая общение конструктивным и ненавязчивым.
          Присоединяйтесь к <strong>Nothing Personal</strong>, чтобы общаться без лишних границ и
          сосредоточиться на самых интересных темах, а не на личных вопросах.
        </Typography>
      </Card>
      <img alt={'logo'} className={s.logo} src={NOPER} />
      <Card className={s.card}>
        <Typography className={s.text}>
          <strong>"Nothing Personal"</strong> is a unique publishing platform where users are
          invited to share articles and engage in thoughtful discussions through comments on each
          other’s posts.
        </Typography>
        <Typography className={s.text}>
          Embracing an open and transparent communication philosophy, the site deliberately avoids
          <strong> private messaging</strong>, ensuring all exchanges remain public and centered
          solely around shared content.
        </Typography>
        <Typography className={s.text}>
          This structure fosters a <em>focused, topic-driven community</em> while preventing
          unrelated or private dialogue, aligning with the platform’s guiding principle of
          <em> "nothing personal."</em>
        </Typography>
        <Typography className={s.text}>
          Whether users seek to present perspectives, provide constructive feedback, or join in
          public discussions, <strong> "Nothing Personal" </strong> ensures a collaborative
          environment where every interaction contributes to a meaningful and collective experience.
        </Typography>
      </Card>
    </div>
  )
}
