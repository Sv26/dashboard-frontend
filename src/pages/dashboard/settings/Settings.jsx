import "./settings.css";

export default function Settings() {
  return (
    <div className="settings-page">
      <h2 className="settings-title">Profile</h2>

      <div className="form-area">
        <div className="settings-form">
          <h3 className="form-title">Edit Profile</h3>
          <div className="divider" />

          <div className="form-group">
            <label>First name</label>
            <input type="text" defaultValue="Sarthak" />
          </div>

          <div className="form-group">
            <label>Last name</label>
            <input type="text" defaultValue="Pal" />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              defaultValue="sarthakpal08@gmail.com"
              disabled
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="************" />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="************" />
          </div>

          <button className="save-btn">Save</button>
        </div>
      </div>
    </div>
  );
}
