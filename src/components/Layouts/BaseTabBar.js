import React, { useState, useEffect } from 'react'
import { useHistory, withRouter } from "react-router-dom";
import "./TabBar.less";
import { TabBar } from 'antd-mobile';
import home_0 from "@/assets/images/icons/home_0.png";
import home_1 from "@/assets/images/icons/home_1.png";
import mine_0 from "@/assets/images/icons/mine_0.png";
import mine_1 from "@/assets/images/icons/mine_1.png";

function BaseTabBar(props) {

  const [selectedTab, setSelectedTab] = useState('homeTab')
  const [hidden, setHidden] = useState(false)

  let pathName = props.location.pathname

  useEffect(() => {
    if(pathName === '/home' && pathName === '/mine') {
      setHidden(true)
    } else {
      if(pathName === '/home') {
        setSelectedTab('homeTab')
      }
      if(pathName === '/mine') {
        setSelectedTab('mineTab')
      }
    }
  }, [pathName])

  const cdnUrl = '//rs1.solution9.net/nft'

  return (
    <div style={{ position: 'fixed', width: '100%', bottom: 0, zIndex: 99 }}>
      <TabBar
        unselectedTintColor="#999999"
        tintColor="#FFFFFF"
        barTintColor="#353535"
        hidden={hidden}
        height={60}
      >
        <TabBar.Item
          icon={<div style={{
            width: '28px',
            height: '28px',
            background: `url(${home_0}) center center /  26px 26px no-repeat` }}
          />}
          selectedIcon={<div style={{
            width: '28px',
            height: '28px',
            background: `url(${home_1}) center center /  26px 26px no-repeat` }}
            />}
          title="首页"
          key="home"
          selected={ selectedTab === 'homeTab' }
          onPress={() => {
            props.history.push({ pathname: '/home' })
            setSelectedTab('homeTab')
          }}
        >
        </TabBar.Item>
        <TabBar.Item
          icon={<div style={{
            width: '28px',
            height: '28px',
            background: `url(${mine_0}) center center /  26px 26px no-repeat` }}
          />}
          selectedIcon={<div style={{
            width: '28px',
            height: '28px',
            background: `url(${mine_1}) center center /  26px 26px no-repeat` }}
          />}
          title="我的"
          key="mine"
          selected={ selectedTab === 'mineTab' }
          onPress={() => {
            props.history.push({ pathname: '/mine' })
            setSelectedTab('mineTab')
          }}
        >
        </TabBar.Item>
      </TabBar>
    </div>
  )
}

export default withRouter(BaseTabBar);