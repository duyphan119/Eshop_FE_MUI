import React, { useState } from "react";
import Input from "../InputFields/Input";
import "./EditPage.css";
import { useSelector, useDispatch } from "react-redux";
// import { update } from "../../Redux/userSlice";
import { updateUser } from "./../../Redux/apiRequests";

const EditPage = (props) => {
  // props
  const { setIsEdit } = props;

  // selector store
  const user = useSelector((state) => state.user);

  // state
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [theme, setTheme] = useState("#ff9051");
  const [url, setUrl] = useState(user.avaUrl);

  // dispatch
  const dispatch = useDispatch();

  const avaUrl = [
    "https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI3Q0fiSFICnl9tB1twSvcdXFX6goEtBaiOw&usqp=CAU",
    "https://i.pinimg.com/474x/8f/33/30/8f3330d6163782b88b506d396f5d156f.jpg",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEdit(false);
    const update = {
      name: name,
      age: age,
      about: about,
      avaUrl: url,
      themeColor: theme,
    };
    updateUser(update, dispatch);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <section className="edit-container">
          <button className="close">Save</button>
          <div className="edit-profile">Edit profile</div>
          <div className="input-container">
            <Input label="Display name" data={user.name} setData={setName} />
            <Input label="Age" data={user.age} setData={setAge} />
            <Input
              inputType="textarea"
              classStyle="input-about"
              label="About"
              data={user.about}
              setData={setAbout}
            />
            <label>Profile Picture</label>
            <div className="input-image-container">
              <>
                {avaUrl.map((url, index) => {
                  return (
                    <img
                      key={index}
                      src={url}
                      className="input-image"
                      alt=""
                      onClick={(e) => setUrl(e.target.src)}
                    />
                  );
                })}
              </>
            </div>
            <div className="theme-container">
              <label>Theme</label>
              <input
                type="color"
                className="theme-color"
                onChange={(e) => setTheme(e.target.value)}
              />
            </div>
          </div>
        </section>
      </form>
    </>
  );
};

export default EditPage;
