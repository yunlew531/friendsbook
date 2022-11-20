import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isToday from 'dayjs/plugin/isToday';
import 'dayjs/locale/zh-tw';

dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.locale('zh-tw');

export default dayjs;
