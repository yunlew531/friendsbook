export const light = {
  color: {
    primary: '#1877F2',
    yellow_100: '#FFE300',
    black_100: '#000',
    black_200: '#58595F',
    black_300: '#4B4B4B',
    black_400: '#535354',
    black_500: '#1C1C1C',
    white_100: '#fff',
    gray_100: '#D0D0D6',
    gray_200: '#FAF8FD',
    gray_300: '#959599',
    gray_400: '#EEEEEE',
    gray_500: '#788292',
    blue_100: '#00527b',
    blue_200: '#F0F7FF',
  },
  bgColor: '#fff',
  cardColor: '#fff',
};

export const dark = {
  color: {
    primary: '#fff',
  },
  bgColor: '#06283D',
};

const theme = {
  ...light,
  fontSizes: {
    l: '50px',
    s: '30px',
    fs_1: '20px',
    fs_2: '18px',
    fs_3: '16px',
    fs_4: '14px',
    fs_5: '12px',
  },
  shadow: {
    l: '0 1rem 1rem rgba(0, 0, 0, .175);',
    m: '0 .5rem 1rem rgba(0, 0, 0, .15);',
    s: '0 .125rem .25rem rgba(0, 0, 0, .075);',
  },
};

export default theme;
