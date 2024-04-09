import React from "react"
import Banner from "../components/Banner"
import Toggle from "../components/Toggle"
import Sidebar from "../components/Sidebar"

export default function Home() {
  return (
    <div className="home-page">
      <Banner />
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <Toggle />
            <div className="article-preview">
              <div className="article-meta">
                <a href="profile.html">
                  <img src="http://i.imgur.com/Qr71crq.jpg" />
                </a>
                <div className="info">
                  <a className="author">Eric Simons</a>
                  <span className="date">January 20th</span>
                </div>
                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                  <i className="ion-heart" /> 29
                </button>
              </div>
              <a className="preview-link">
                <h1>How to build webapps that scale</h1>
                <p>This is the description for the post.</p>
                <span>Read more...</span>
              </a>
            </div>
            <div className="article-preview">
              <div className="article-meta">
                <a href="profile.html">
                  <img src="http://i.imgur.com/N4VcUeJ.jpg" />
                </a>
                <div className="info">
                  <a className="author">Albert Pai</a>
                  <span className="date">January 20th</span>
                </div>
                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                  <i className="ion-heart" /> 32
                </button>
              </div>
              <a className="preview-link">
                <h1>
                  The song you won't ever stop singing. No matter how hard you
                  try.
                </h1>
                <p>This is the description for the post.</p>
                <span>Read more...</span>
              </a>
            </div>
          </div>
          <div className="col-md-3">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  )
}
