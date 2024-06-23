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

function Home() {
  const { setPage, setLoader, userDetail, loader } = useGlobalStore();
  const [showDocUploadNotice, setShowDocUploadNotice] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

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

  const handleUploadID = async () => {
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
        doct_type: 'Identification Card',
      });
      setLoader(false);
      setShowDocUploadNotice(false);
    } else {
      toast.error('You have not selected any file');
      setLoader(false);
    }
  };

  useEffect(() => {
    if (!userDetail.doc) {
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
            <p className="text-3xl font-bold opacity-60">
              {userDetail.account}
            </p>
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
        <div className="flex flex-col gap-10">
          <div className="text-xs text-center space-y-4">
            <p>Complete your registration</p>
            <p>Upload an Identity card</p>
          </div>
          <div className="grid md:grid-cols-2">
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
            <div className="upload relative flex flex-col items-center mt-10 md:mt-0">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="fileUpload"
              />
              <label
                htmlFor="fileUpload"
                className="cursor-pointer px-4 py-2 bg-pri text-white rounded-md"
              >
                Choose File
              </label>
              {preview && (
                <div className="mt-4">
                  <img
                    src={preview}
                    alt="Selected ID"
                    className="max-w-full h-auto rounded-md"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className="min-w-64 py-2 bg-pri text-white rounded-md"
              onClick={handleUploadID}
            >
              {loader ? 'Uploading, Please wait' : 'Uplaod'}
            </button>
          </div>
        </div>
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
