import { useEffect, useState } from 'react';
import { homeOptions } from './accountData';
import zenithpayu from '../../assets/ZenithpayU.mp4';
import { useGlobalStore } from '../../store/Context';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import one from '../../assets/one.png';
import two from '../../assets/two.png';
import three from '../../assets/three.png';
import Modal from '../../components/common/Modal';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../../../firebase';
import { ToastContainer, toast } from 'react-toastify';
import { capitalizeFirstLetter } from '../../../utils/capitalizeFirstLetter';
import { GoUnverified, GoVerified } from 'react-icons/go';
import { TbProgressHelp } from 'react-icons/tb';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import emailjs from '@emailjs/browser';

function Home() {
  const { setPage, setLoader, userDetail, loader } = useGlobalStore();
  const [showDocUploadNotice, setShowDocUploadNotice] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [docType, setDocType] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePage = ({ route }) => {
    setLoader(true);
    setPage(route.toLowerCase());
  };
  const handlePageChange = () => {
    setLoader(true);
    setPage('transactions');
  };

  const handleUploadID = async (e) => {
    e.preventDefault();
    let profileImageUrl = null;
    setLoader(true);
    if (selectedFile) {
      const uniqueId = Date.now().toString();
      const storageRef = ref(storage, `images/${uniqueId}.jpeg`);

      /** @type {any} */
      const metadata = {
        contentType: 'image/jpeg',
      };

      await uploadBytes(storageRef, selectedFile, metadata);

      profileImageUrl = await getDownloadURL(storageRef);

      const uData = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(uData, {
        doc: profileImageUrl,
        doc_type: docType,
        status: 'awaiting verification',
        doc_verified: false,
      });

      const params = {
        message: 'An ID is uploaded. Waiting for your verification',
        from_name: `${userDetail.first_name} ${userDetail.last_name}`,
        to_name: 'Admin',
      };
      emailjs.send('service_k98a6fk', 'template_5u1qxle', params, {
        publicKey: 'l1SMwkup0_5uqyGfU',
      });

      setLoader(false);
      setShowDocUploadNotice(false);
      toast.success('Your ID is uploaded and will be verified shortly');
    } else {
      toast.error('You have not selected any file');
      setLoader(false);
    }
  };

  useEffect(() => {
    if (
      Object.values(userDetail || {}).length > 0 &&
      !userDetail.doc_verified &&
      userDetail.status !== 'awaiting verification' &&
      userDetail.role !== 'admin'
    ) {
      setShowDocUploadNotice(true);
    }
  }, [userDetail]);

  return (
    <div className="home_render mt-2">
      <div className="py-6 px-4 bg-white rounded-xl flex flex-col gap-6 z-50">
        <div className="acc md:flex justify-between border-b-2 pb-6">
          <div className="acc_balance flex-1">
            <p className="">Dollar Balance</p>
            <p className="text-3xl font-bold">
              &#36; <span>{userDetail.balance || 0.0}</span>
            </p>
          </div>
          <div className="acc_status flex-1 hidden sm:block">
            <p className="">Account Status</p>
            <div className="flex items-center gap-x-5 justify-start">
              <p className="text-3xl font-bold opacity-60">
                {capitalizeFirstLetter(userDetail.account)}
              </p>
              <div>
                {userDetail.status === 'awaiting verification' ? (
                  <>
                    <TbProgressHelp
                      className="text-yellow-600 text-2xl"
                      data-tooltip-id="awaiting-verification"
                      data-tooltip-content="Awaiting Verification"
                    />
                    <ReactTooltip id="awaiting-verification" />
                  </>
                ) : !userDetail.doc_verified ? (
                  <>
                    <GoUnverified
                      className="text-red-500 text-2xl"
                      data-tooltip-id="not-verified"
                      data-tooltip-content="Not Verified"
                    />
                    <ReactTooltip id="not-verified" />
                  </>
                ) : (
                  <>
                    <GoVerified
                      className="text-green-500 text-2xl"
                      data-tooltip-content="Verified"
                      data-tooltip-id="verified"
                    />
                    <ReactTooltip id="verified" />
                  </>
                )}
              </div>
            </div>
          </div>
          <p className="text-neutral text-[12px] md:hidden">
            Your account Number: {userDetail?.account_number}
          </p>
        </div>

        <div className="grid grid-cols-4 justify-between items-center gap-y-12">
          {homeOptions.map((opt, idx) => (
            <div
              className="flex flex-col justify-center items-center space-y-2"
              key={idx}
            >
              <div
                className="w-12 h-12 rounded-xl flex flex-col justify-center items-center text-white cursor-pointer"
                style={{
                  backgroundColor: opt.color,
                  border: !opt.color && '1px solid #000',
                  color: !opt.color && '#000',
                  fontSize: '30px',
                }}
                onClick={() => handlePage(opt)}
              >
                {opt.icon}
              </div>
              <p className="text-[12px] truncate">{opt.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="my-5 bg-black overflow-hidden items-center justify-center flex rounded-xl">
        <video
          height={300}
          width={400}
          controls
          className="rouned-md"
          autoPlay={false}
          muted
        >
          <source src={zenithpayu} type="video/mp4"></source>
        </video>
      </div>
      <Slider {...settings} dots={true} className="overflow-hidden">
        <div className="">
          <img src={one} alt="" className="" />
        </div>
        <div className="">
          <img src={two} alt="" className="" />
        </div>
        <div className="">
          <img src={three} alt="" className="" />
        </div>
      </Slider>
      <div className="flex justify-between items center my-5">
        <p>Transactions</p>
        <p className="text-pri cursor-pointer" onClick={handlePageChange}>
          View All
        </p>
      </div>

      <Modal
        isOpen={showDocUploadNotice}
        onClose={() => setShowDocUploadNotice(false)}
        width={'max-w-3xl'}
        showClose={true}
      >
        <form action="" method="post" onSubmit={handleUploadID}>
          <div className="text-xs text-center space-y-4 py-3">
            <p>Complete your registration</p>
            <p>Upload an Identity card</p>
          </div>
          <div className="grid md:grid-cols-2 py-4">
            <div>
              <p className="mb-4">Rules</p>
              <ul className="list-disc list-inside text-left text-xs text-gray-500 space-y-3">
                <li>The ID must be government-issued.</li>
                <li>The ID must be valid and not expired.</li>
                <li>The ID must have a clear photo of you.</li>
                <li>The ID must show your full name.</li>
                <li>Upload the front and back if required.</li>
              </ul>
            </div>
            <div className="">
              <div className="upload h-64 md:h-40 relative flex flex-col justify-center items-center mt-10 md:mt-0 overflow-hidden rounded-md">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="fileUpload"
                />
                <label
                  htmlFor="fileUpload"
                  className={`${
                    selectedFile ? 'text-white ' : 'bg-pri text-white'
                  } cursor-pointer px-4 py-2  rounded-md z-40`}
                >
                  {selectedFile ? 'Replace file' : 'Choose File'}
                </label>
                {preview && (
                  <div className="absolute h-full w-full">
                    <img
                      src={preview}
                      alt="Selected ID"
                      className="object-contain h-full w-full rounded-md"
                    />
                  </div>
                )}
              </div>
              <div className="my-3">
                <input
                  list="document-types"
                  type="text"
                  required
                  placeholder="Document type"
                  onChange={({ target }) => setDocType(target.value)}
                  className="shadow shadow-pri w-full text-xs text-gray-600 rounded-md p-2 focus:outline-none placeholder:text-[11px]"
                />
                <datalist id="document-types">
                  <option value="National ID Card"></option>
                  <option value="Voters Card"></option>
                  <option value="Drivers License"></option>
                  <option value="International Passport"></option>
                </datalist>
              </div>
            </div>
          </div>

          {selectedFile && (
            <div className="flex justify-center py-3">
              <button
                type="submit"
                className="min-w-64 py-2 bg-pri text-white rounded-md"
              >
                {loader ? 'Uploading, Please wait' : 'Uplaod'}
              </button>
            </div>
          )}
        </form>
      </Modal>

      <ToastContainer />
    </div>
  );
}

export default Home;

const settings = {
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 2000,
  dot: true,

  // responsive: [
  //   {
  //     breakpoint: 600,
  //     settings: {
  //       slidesToShow: 3,
  //     },
  //   },
  // ],
};
