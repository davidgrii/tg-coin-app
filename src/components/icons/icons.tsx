import { motion } from 'framer-motion'

export const MarketIcon = () => (
  <svg width="21" height="21" viewBox="0 0 62 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="path-1-inside-1_29_148" fill="white">
      <rect x="38" y="20" width="24" height="32" rx="5" />
    </mask>
    <rect x="38" y="20" width="24" height="32" rx="5" stroke="currentColor" strokeWidth="12"
          mask="url(#path-1-inside-1_29_148)" />
    <mask id="path-2-inside-2_29_148" fill="white">
      <rect y="12" width="24" height="40" rx="5" />
    </mask>
    <rect y="12" width="24" height="40" rx="5" stroke="currentColor" strokeWidth="12"
          mask="url(#path-2-inside-2_29_148)" />
    <mask id="path-3-inside-3_29_148" fill="white">
      <rect x="19" width="24" height="52" rx="5" />
    </mask>
    <rect x="19" width="24" height="52" rx="5" stroke="currentColor" strokeWidth="12"
          mask="url(#path-3-inside-3_29_148)" />
    <line x1="5" y1="49" x2="54" y2="49" stroke="currentColor" strokeWidth="6" />
  </svg>
)

export const FavoritesIcon = () => (
  <svg width="21" height="21" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M43.0792 51.5189L27.8164 43.4303L12.7955 52L15.4313 34.3127L3 22.0137L19.8917 19.1709L27.2297 3L35.0336 18.9303L52 21.2352L39.9313 33.9235L43.0792 51.5189Z"
      stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const PortfolioIcon = () => (
  <svg width="21" height="21" viewBox="0 0 64 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="51" height="38" rx="5" stroke="currentColor" strokeWidth="6" />
    <rect x="35" y="17.7736" width="27" height="8.45283" rx="4.22642" stroke="currentColor" strokeWidth="4" />
    <path
      d="M41.5 22C41.5 22.3286 41.1434 22.7453 40.5 22.7453C39.8566 22.7453 39.5 22.3286 39.5 22C39.5 21.6715 39.8566 21.2548 40.5 21.2548C41.1434 21.2548 41.5 21.6715 41.5 22Z"
      fill="#9D9D9D" stroke="currentColor" />
  </svg>
)

export const SearchIcon = () => (
  <svg width="21" height="21" viewBox="0 0 55 54" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="21.6316" cy="21.6316" r="18.6316" stroke="currentColor" strokeWidth="6" />
    <path d="M35.2266 34.1088L51.9997 50.8819" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
  </svg>
)

export const StarIcon = () => (
  <motion.svg
    width="16"
    height="16"
    viewBox="0 0 35 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.8, opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    <path
      d="M27.9921 34.6662L17.7131 29.0537L7.59696 35L9.37211 22.7272L1 14.1932L12.3761 12.2206L17.318 1L22.5736 12.0537L34 13.653L25.8721 22.4571L27.9921 34.6662Z"
      stroke="#9D9D9D"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.svg>
)

export const StarFavoriteIcon = () => (
  <motion.svg
    width="16"
    height="16"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.8, opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    <path
      d="M28.81 34.6662L18.2196 29.0537L7.79686 35L9.62581 22.7272L1 14.1932L12.7208 12.2206L17.8125 1L23.2274 12.0537L35 13.653L26.6258 22.4571L28.81 34.6662Z"
      fill="#FFB364"
      stroke="#FFB364"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.svg>
)

export const EditIcon = () => (
  <svg width="20" height="20" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="57" height="57" rx="9.5" stroke="#007BFF" />
    <path
      d="M34.314 14.8118L34.3141 14.8116C34.7297 14.3958 35.2231 14.066 35.7661 13.8409C36.3092 13.6158 36.8913 13.5 37.4792 13.5C38.067 13.5 38.6491 13.6158 39.1922 13.8409C39.7352 14.066 40.2286 14.3958 40.6442 14.8116L40.6443 14.8118L43.1882 17.3557L43.1884 17.3558C43.6042 17.7714 43.934 18.2648 44.1591 18.8078C44.3842 19.3509 44.5 19.933 44.5 20.5208C44.5 21.1087 44.3842 21.6908 44.1591 22.2339C43.934 22.7769 43.6042 23.2703 43.1884 23.6859L43.1882 23.686L22.6356 44.2441L22.6348 44.2449C22.5541 44.326 22.4582 44.3903 22.3525 44.434C22.2468 44.4778 22.1335 44.5002 22.0191 44.5H22.0181H14.3723C14.141 44.4997 13.9194 44.4077 13.7558 44.2442C13.5924 44.0807 13.5004 43.8591 13.5 43.628V35.9829C13.501 35.7515 13.5932 35.5297 13.7565 35.3656C13.7565 35.3656 13.7566 35.3655 13.7566 35.3655L34.314 14.8118ZM15.3897 36.1953L15.2433 36.3418V36.5489V42.2567V42.7567H15.7433H21.4493H21.6564L21.8028 42.6103L36.269 28.1441L36.6226 27.7905L36.269 27.437L30.563 21.731L30.2095 21.3774L29.8559 21.7309L15.3897 36.1953ZM37.5024 26.2056L37.8559 26.559L38.2094 26.2055L41.9604 22.4545L41.9609 22.454C42.4724 21.941 42.7596 21.2462 42.7596 20.5218C42.7596 19.7974 42.4724 19.1025 41.9609 18.5895L41.9605 18.5891L39.413 16.0397L39.4126 16.0393C38.8998 15.5273 38.2048 15.2396 37.4801 15.2396C36.7554 15.2396 36.0603 15.5273 35.5475 16.0393L35.5473 16.0396L31.7945 19.7924L31.4409 20.146L31.7946 20.4995L37.5024 26.2056Z"
      fill="white" stroke="#007BFF" />
  </svg>
)

export const EditV2Icon = () => (
  <svg width="11" height="11" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.53056 0.374322H13.4166L10.1308 3.84741H6.53056C6.12421 3.84771 5.72193 3.92932 5.3469 4.08753C4.97186 4.24575 4.63148 4.47744 4.34535 4.76926C4.05682 5.05866 3.82774 5.40293 3.67131 5.78224C3.51489 6.16155 3.4342 6.56842 3.4339 6.97941V24.5269H20.7834C21.1898 24.5269 21.5921 24.4454 21.9672 24.2871C22.3423 24.1289 22.6826 23.8971 22.9686 23.6051C23.2573 23.3158 23.4865 22.9716 23.643 22.5922C23.7994 22.2129 23.88 21.8059 23.8801 21.3949V17.8112L27.314 14.1837V21.3949C27.3129 22.2609 27.1431 23.1182 26.8142 23.9178C26.4854 24.7173 26.0041 25.4435 25.3976 26.0549V26.0664C24.1775 27.3027 22.5219 27.9983 20.7948 28H2.62043C1.92775 27.9987 1.2639 27.7194 0.774735 27.2233C0.530077 26.9775 0.335727 26.6852 0.202793 26.3633C0.0698598 26.0414 0.000949138 25.6962 0 25.3474L0 6.97941C0.00114316 6.11378 0.17098 5.25686 0.499799 4.45766C0.828618 3.65846 1.30997 2.93265 1.91633 2.32174L1.92772 2.301C2.53166 1.68841 3.24899 1.20215 4.03875 0.869983C4.82851 0.537819 5.67523 0.36626 6.53056 0.365103V0.374322ZM16.634 17.6199L9.93028 19.0027L10.8987 11.7869L16.634 17.6199ZM13.0178 9.60209L21.9432 0.206083C22.039 0.0998173 22.1677 0.02979 22.3082 0.0075799C22.4487 -0.0146302 22.5924 0.012307 22.7157 0.0839376L27.838 5.09883C27.8928 5.15353 27.9355 5.21935 27.9633 5.29196C27.9911 5.36456 28.0033 5.4423 27.9992 5.52005C27.9951 5.59779 27.9748 5.67378 27.9396 5.74299C27.9043 5.8122 27.855 5.87307 27.7947 5.92158L18.7486 15.4374L13.0178 9.60209Z"
      fill="white" />
  </svg>
)

export const DeleteIcon = () => (
  <svg width="12" height="12" viewBox="0 0 27 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd"
          d="M2.86969 9.68733H24.3017C24.4739 9.68036 24.6463 9.69436 24.8152 9.72904C25.0944 9.79143 25.3506 9.93237 25.5546 10.1357C25.7915 10.3666 25.9407 10.6749 25.9756 11.0064C25.9821 11.1318 25.977 11.2575 25.9602 11.3818L24.1349 30.5818V30.6157V30.6887C24.1228 30.768 24.1056 30.8464 24.0835 30.9233V30.939C23.9867 31.2419 23.7995 31.5067 23.5479 31.6968C23.2963 31.8869 22.9927 31.9929 22.6792 32H4.44859C4.34023 31.9947 4.2327 31.9781 4.12768 31.9505C4.02448 31.9191 3.92469 31.8772 3.82987 31.8253C3.60608 31.6946 3.41708 31.5104 3.27929 31.2887C3.14149 31.067 3.05905 30.8145 3.03913 30.5532L1.242 11.3949C1.22149 11.2516 1.21633 11.1065 1.2266 10.9621C1.26251 10.6352 1.41067 10.3315 1.64507 10.1044C1.85747 9.89481 2.12488 9.7518 2.41527 9.69255C2.56695 9.66563 2.72091 9.65427 2.87482 9.65866L2.86969 9.68733ZM1.45252 2.29409H9.5319V1.56415C9.53062 1.54071 9.53062 1.51721 9.5319 1.49377C9.54807 1.10086 9.7094 0.728553 9.98375 0.450998C10.2717 0.162352 10.66 0.000349653 11.0646 0L16.0375 0H16.1145C16.5096 0.0200816 16.8819 0.1937 17.1543 0.484888C17.4267 0.776075 17.5784 1.16252 17.5779 1.56415V2.29409H25.7934H25.8935C26.1842 2.31824 26.4565 2.44854 26.66 2.66086C26.8634 2.87319 26.9842 3.15316 27 3.44896C27 3.49589 27 3.53238 27 3.57931V6.14974C27 6.32881 26.9299 6.50055 26.8052 6.62717C26.6805 6.75379 26.5114 6.82493 26.3351 6.82493H0.66692C0.491894 6.82494 0.323921 6.75488 0.19944 6.62994C0.0749589 6.50501 0.00400916 6.33527 0.00198183 6.15756V3.52717C-0.000660609 3.5003 -0.000660609 3.47323 0.00198183 3.44635C0.0195709 3.17184 0.127246 2.91123 0.30781 2.70614C0.488374 2.50106 0.731411 2.36333 0.998105 2.31495C1.14872 2.29488 1.30074 2.28791 1.45252 2.29409ZM12.261 16.0326C12.292 15.7264 12.4337 15.4428 12.6587 15.2366C12.8837 15.0304 13.1761 14.9162 13.4792 14.9162C13.7823 14.9162 14.0746 15.0304 14.2996 15.2366C14.5247 15.4428 14.6664 15.7264 14.6974 16.0326V25.6782C14.6664 25.9844 14.5247 26.268 14.2996 26.4742C14.0746 26.6804 13.7823 26.7946 13.4792 26.7946C13.1761 26.7946 12.8837 26.6804 12.6587 26.4742C12.4337 26.268 12.292 25.9844 12.261 25.6782V16.0326ZM18.3532 15.9804C18.3869 15.668 18.5406 15.3816 18.7809 15.1834C19.0212 14.9853 19.3288 14.8913 19.6369 14.922C19.7883 14.9207 19.9384 14.9497 20.0786 15.0075C20.2189 15.0653 20.3465 15.1506 20.4541 15.2587C20.5617 15.3668 20.6472 15.4954 20.7057 15.6372C20.7642 15.7789 20.7944 15.931 20.7948 16.0847L20.2813 25.7303C20.2483 26.0431 20.0948 26.3299 19.8543 26.5282C19.6138 26.7265 19.3059 26.8201 18.9976 26.7888C18.8463 26.7901 18.6962 26.7611 18.5559 26.7033C18.4157 26.6455 18.2881 26.5601 18.1804 26.4521C18.0728 26.344 17.9873 26.2154 17.9288 26.0736C17.8704 25.9319 17.8401 25.7798 17.8398 25.6261L18.3532 15.9804ZM6.4203 16.0847C6.42029 15.9312 6.45025 15.7791 6.50843 15.6374C6.56662 15.4956 6.65188 15.367 6.75929 15.2589C6.86671 15.1508 6.99415 15.0653 7.13426 15.0075C7.27437 14.9497 7.42437 14.9207 7.5756 14.922C7.88369 14.8913 8.19128 14.9853 8.4316 15.1834C8.67192 15.3816 8.82559 15.668 8.85926 15.9804L9.37273 25.6261C9.3724 25.7798 9.34213 25.9319 9.28366 26.0736C9.2252 26.2154 9.13969 26.344 9.03207 26.4521C8.92445 26.5601 8.79684 26.6455 8.65659 26.7033C8.51634 26.7611 8.36621 26.7901 8.21486 26.7888C7.90663 26.8201 7.59868 26.7265 7.3582 26.5282C7.11772 26.3299 6.96422 26.0431 6.9312 25.7303L6.41773 16.0847H6.4203Z"
          fill="#E40505" />
  </svg>
)

export const ClearIcon = () => (
  <svg width="16" height="16" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M32.9027 14.326L24.6442 22.6123L16.3857 14.326L15.1211 15.5866L23.3839 23.8769L15.1211 32.1674L16.3857 33.4274L24.6442 25.1414L32.9027 33.4274L34.1673 32.1674L25.9045 23.8769L34.1673 15.5866L32.9027 14.326Z"
      fill="white" />
    <circle cx="24.5" cy="24.5" r="22.5" fill="#1C1C1E" fillOpacity="0.5" stroke="#9D9D9D" strokeWidth="4" />
  </svg>
)

export const SearchV2Icon = () => (
  <svg width="15  " height="15" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="15.3915" cy="15.3915" r="13.3915" fill="#1C1C1E" fillOpacity="0.5" stroke="#007BFF" strokeWidth="4" />
    <path d="M26.0645 25.2695L33 32" stroke="#007BFF" strokeWidth="4" strokeLinecap="round" />
  </svg>
)

export const PortfolioArrowIcon = () => (
  <svg width="12" height="12" viewBox="0 0 27 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.5 18L0.942631 0L26.0574 0L13.5 18Z" fill="#007BFF" />
  </svg>
)