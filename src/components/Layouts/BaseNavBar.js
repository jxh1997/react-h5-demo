/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import "./NavBar.less";

function BaseNavBar(props) {

  const [navBarTitle, setNavBarTitle] = useState('111')
  const [hiddenNavBar, setHiddenNavBar] = useState(true)
  const [hiddenShare, setHiddenShare] = useState(true)
  const [hiddenTitle, setHiddenTitle] = useState(true)

  let pathName = props.location.pathname
  
  const isHiddenNavBar = ['/home']
  const isHiddenTitle = ['/mine1']
  const isShowShare = ['/indexDetail']

  useEffect(() => {
    if(isHiddenNavBar.includes(pathName)) {
      setHiddenNavBar(true)
    } else {
      setHiddenNavBar(false)
      if(isHiddenTitle.includes(pathName)) {
        setHiddenTitle(true)
      } else {
        setHiddenTitle(false)
      }
      if(isShowShare.includes(pathName)) {
        setHiddenShare(false)
      } else {
        setHiddenShare(true)
      }
    }
    return () => {
      pathName = ''
    }
  }, [pathName])
  

  const handleBack = () => {
    props.history.go(-1);
  }

  const handleShare = () => {
    console.log('share');
  }

  return (
    <div>
      <div className='base-nav-none-bar' style={!hiddenNavBar ? { display: 'none' } : null}></div>
      <div className='base-nav-bar' style={hiddenNavBar ? { display: 'none' } : null}>
        <div className='base-nav-bar-left-btn' style={hiddenNavBar ? { display: 'none' } : null} onClick={() => handleBack()}></div>
        <div className='base-nav-bar-title' style={hiddenTitle ? { display: 'none' } : null}> { navBarTitle } </div>
        <div className='base-nav-bar-right-btn' style={hiddenShare ? { display: 'none' } : null} onClick={() => handleShare()}></div>
        <div className='base-nav-bar-right-none-btn' style={!hiddenShare ? { display: 'none' } : null}></div>
      </div>
    </div>
  )
}

export default withRouter(BaseNavBar);