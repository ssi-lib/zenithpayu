import { MdEmail } from 'react-icons/md';

const notifications = [
  {
    id: 1,
    title: 'MERRY CHRISTMAS',
    date: '2023-08-16',
    content:
      'Merry Christmas from all of us at Zenithpayu Online Mobile Banking! Wishing you and your loved ones a joyful holiday season filled with peace, love, and happiness. May the spirit of Christmas bring you warmth and good cheer. Thank you for being a part of the Zenithpayu family!"',
  },
  {
    id: 2,
    title: 'WHATSAPP SUPPORT TEAM',
    date: '2023-11-19',
    content:
      'Dear esteemed customer, Our WhatsApp support team are back to there service, as we all know this is international swift support team, do expect different country from support team. You can speak to us via email and also on WhatsApp for faster communication.',
  },
  {
    id: 3,
    title: 'ACCOUNT SUSPENDED AND UPGRADE',
    date: '2023-08-16',
    content: 'Dear user, kindly activate your master card to avoid...',
  },
  {
    id: 4,
    title: 'Will BoE Decision Push GBPUSD Higher?',
    date: '2023-06-19',
    content: 'This will be a big week for Sterling as focus falls ...',
  },
  {
    id: 4,
    title: 'SUPPORT WHATSAPP CONTACT CHANGED',
    date: '2023-06-08',
    content:
      'Dear user, Due to inconveniences on your complainant, we have decided to inform our support team to be active on WhatsApp. There is frequently change of support account officer, if a support officer do not response to you faster, kindly write to us in both email. Thanks for choosing zenithpayu',
  },
  {
    id: 4,
    title: 'CARD ACTIVATION',
    date: '2023-06-06',
    content:
      'Dear user, We are sorry for the inconveniences that might have caused to you, zenithpayu does not have access to your available balance, due to nature of zenithpayu service operation. You can convert your available balance from the above series of currency pairs EURO to USD USD TO EURO ETC. you can withdraw to your local currency through the above conversion. HENCE CARD FEE does not accept any fiat currency but only cryptocurrency due to its automated functions. As soon as you deposit usdt in your card fee, it will trigger your master card pin into your email. Thanks for your understanding',
  },
  {
    id: 4,
    title: 'ABSTAIN FROM ILLEGAL TRANSACTION',
    date: '2023-04-29',
    content:
      'Dear user, we are working according to international financial services rules and regulations, we employ you to be victorious and careful on what you use your banking information for, Do not engage in money laundering using your zenithpayu as this is illegal and can be prosecuted when caught. Kindly be rest assured you keep your personalized card private from eye of fraudster. zenithpayu will never be responsible for any assets lost thanks.',
  },
];

function NotificationsList() {
  return (
    <div className="my-4">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-white rounded-lg shadow-lg p-4 mb-4 flex items-start space-x-4 w-full"
        >
          <div className="text-xl text-[#22539C]">{<MdEmail />}</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#22539C] truncate">
              {notification.title}
            </p>
            <p className="text-sm text-[#22539C] my-2">
              {notification.content}
            </p>
            <p className="text-xs text-gray-400">{notification.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NotificationsList;
