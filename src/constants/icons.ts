/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import check from '../../public/icons/check.svg'
import chevronDown from '../../public/icons/chevron-down.svg'
import bell from '../../public/icons/bell.svg'
import calendar from '../../public/icons/calendar.svg'
import kakao from '../../public/icons/kakao.svg'
import mobileApp from '../../public/icons/mobile-app.svg'
import link from '../../public/icons/link.svg'
import powerUpQuiz from '../../public/icons/power-up-quiz.svg'
import search from '../../public/icons/search.svg'
import star from '../../public/icons/star.svg'
import circleQuestion from '../../public/icons/circle-question.svg'

const icons = {
  check,
  chevronDown,
  bell,
  calendar,
  kakao,
  mobileApp,
  link,
  powerUpQuiz,
  search,
  star,
  circleQuestion,
}

export default icons as Record<keyof typeof icons, StaticImport>
