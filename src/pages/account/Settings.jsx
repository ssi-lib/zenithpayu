import { useRef, useState } from 'react';
import { useGlobalStore } from '../../store/Context';
import Button from './components/ui/Button';
import Switch from './components/ui/Switch';
import { BsCamera, BsInfoCircle } from 'react-icons/bs';
import Modal from '../../components/common/Modal';
import { MdPerson } from 'react-icons/md';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../../../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

function Settings() {
  const [uploadModal, setUplaodModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [factorModal, setFactorModal] = useState(false);
  const [check, setCheck] = useState(false);
  const [upgradeModal, setUpgradeModal] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const { setPage, setLoader, userDetail } = useGlobalStore();
  const userInfo = [
    { label: 'First Name', value: userDetail.first_name },
    { label: 'Last Name', value: userDetail.last_name },
    {
      label: 'Account Name',
      value: userDetail.first_name + ' ' + userDetail.last_name,
    },
    { label: 'Email', value: userDetail.email },
    { label: 'Phone', value: userDetail.phone_number },
    { label: 'Country', value: userDetail.country },
    { label: 'State', value: userDetail.state },
    { label: 'City', value: userDetail.city },
    { label: 'Zip Code', value: userDetail.zip_code },
    { label: 'App, Suit, Unit', value: userDetail.app_suit_unit },
    { label: 'Date of Birth', value: userDetail.date },
  ];

  const handlePageChange = (route) => {
    setLoader(true);
    setPage(route.toLowerCase());
  };

  const signOutAuth = () => {
    signOut(auth);
    window.location.href = '/';
  };

  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatar(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const fileInputRef = useRef(null);

  const handleUpdateProfile = async () => {
    let profileImageUrl = null;
    setLoader(true);
    if (avatar) {
      const uniqueId = Date.now().toString();
      const storageRef = ref(storage, `images/${uniqueId}.jpeg`);

      /** @type {any} */
      const metadata = {
        contentType: 'image/jpeg',
      };

      await uploadBytes(storageRef, avatar, metadata);

      profileImageUrl = await getDownloadURL(storageRef);

      const uData = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(uData, {
        photoURL: profileImageUrl,
      });
      setLoader(false);
      setUplaodModal(false);
    }
    setLoader(false);
    setUplaodModal(false);
  };

  const handleTwoStepVerification = (e) => {
    setFactorModal(true);

    if (e.target.checked) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 py-6 px-4">
      <div className="profile_img flex flex-col gap-4 justify-center items-center">
        <div className="img_con w-36 h-36 border rounded">
          <img src={userDetail?.photoURL} alt="prof" />
        </div>
        <div
          className="change_prof_img flex items-center space-x-3 bg-white rounded-md px-4 py-1 cursor-pointer"
          onClick={() => setUplaodModal(true)}
        >
          <BsCamera className="text-pri" />
          <p className="font-bold text-xs text-pri">Change account photo</p>
        </div>
      </div>
      <div className="user_details flex flex-col gap-4">
        <h2 className="text-neutral text-sm">ZenithPayu Profile</h2>
        <div className="details bg-white p-4 rounded-xl shadow">
          {userInfo.map((n, i) => (
            <div key={i} className="flex justify-between py-4 border-b pt-3">
              <span className="text-pri text-sm">{n.label}</span>
              <span className="text-neutral text-sm">{n.value}</span>
            </div>
          ))}

          <Button
            textContent={'Edit Information'}
            styles={'bg-pri text-white mt-3'}
            callback={() => setEditModal(true)}
          />
        </div>
      </div>
      <div className="acc_limit flex flex-col gap-3">
        <h2 className="text-neutral text-sm">Account Limit</h2>
        <div className="flex justify-between items-center bg-white shadow p-3 rounded-xl">
          <span className="flex-1 text-pri text-sm">Tier 1</span>
          <Button
            textContent={'Upgrade Limit'}
            styles={'bg-pri flex-1 text-white'}
            callback={() => setUpgradeModal(true)}
          />
        </div>
      </div>
      <div className="edit_security flex flex-col gap-4">
        <h2 className="text-neutral text-sm">Security</h2>
        <div className="flex flex-col gap-2 bg-white shadow p-3 rounded-xl">
          <h3
            className="text-pri border-b pb-2 cursor-pointer"
            onClick={() => handlePageChange('update_password')}
          >
            Update Password
          </h3>
          <div className="flex justify-between items-center p-1">
            <span className="whitespace-nowrap">2 Step Verification</span>
            <Switch
              handleActivateCard={handleTwoStepVerification}
              checked={null}
            />
          </div>
        </div>
      </div>
      <p className="text-red-600 text-center my-5" onClick={signOutAuth}>
        Log Out
      </p>
      <Modal isOpen={uploadModal} onClose={() => setUplaodModal(false)}>
        <div
          className="upload-avatar w-36 h-36 cursor-pointer rounded-3xl border mx-auto mb-8 flex flex-col items-center justify-center bg-white"
          onClick={() => fileInputRef.current.click()}
          style={{
            backgroundImage: avatarPreview ? `url(${avatarPreview})` : 'none',
            backgroundSize: 'cover',
          }}
        >
          {!avatarPreview && (
            <>
              <MdPerson className="text-[80px] text-gray-400" />
              <p className="text-[10px] text-gray-400 text-center">
                Tap or drag and drop your photo here
              </p>
            </>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleAvatarChange}
            style={{ display: 'none' }}
            accept="image/*"
          />
        </div>
        <div className="flex justify-center">
          <Button
            textContent={'Update'}
            styles={'bg-pri flex-1 text-white'}
            callback={handleUpdateProfile}
          />
        </div>
      </Modal>
      <Modal isOpen={editModal} onClose={() => setEditModal(false)}>
        <div className="flex flex-col justify-center items-center">
          <BsInfoCircle />
          <p className="text-sm mt-8 text-center">
            To ensure the safety and security of your account, we kindly request
            that you either visit our nearest branch with a valid form of
            identification or contact our support team via email to initiate
            updates to your account information
          </p>
          <div className="border-t w-full mt-4 text-center py-2">
            <p
              className="text-pri cursor-pointer"
              onClick={() => setEditModal(false)}
            >
              Okay
            </p>
          </div>
        </div>
      </Modal>
      <Modal isOpen={upgradeModal} onClose={() => setUpgradeModal(false)}>
        <div className="flex flex-col justify-center items-center">
          <BsInfoCircle />
          <p className="text-sm mt-8 text-center">
            Please activate and unlock your card before proceeding with
            upgrading your account limit
          </p>
          <div className="border-t w-full mt-4 text-center py-2">
            <p
              className="text-pri cursor-pointer"
              onClick={() => setUpgradeModal(false)}
            >
              Okay
            </p>
          </div>
        </div>
      </Modal>
      <Modal isOpen={factorModal} onClose={() => setFactorModal(false)}>
        <div className="flex flex-col justify-center items-center">
          <BsInfoCircle />
          <p className="text-sm mt-8 text-center">
            {check ? '2 Factor activated' : '2 factor deactivated'}
          </p>
          <div className="border-t w-full mt-4 text-center py-2">
            <p
              className="text-pri cursor-pointer"
              onClick={() => setFactorModal(false)}
            >
              Okay
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Settings;
