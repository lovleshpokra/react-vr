import React from 'react';
import * as aframe from 'aframe';
import Helmet from 'react-helmet';
import 'aframe-teleport-controls';
import MainLeft from './../../images/main-left.jpg';
import MainRight from './../../images/main-right.jpg';
import Video from './../../images/video.mp4';
import Audio from './../../images/audio.mp3';
import SubpageLeft from './../../images/sub-left.jpg';
import SubpageRight from './../../images/sub-right.jpg';

export default class HomePage extends React.PureComponent {
  constructor (props) {
    super (props);
    // this.isVRMode = props.location.search.split('=')[1] || false;
    this.state = {
      isSubpage: false
    }
  }
  componentWillMount() {
    const that = this;
    if (!aframe.components['audio-handler'])
    aframe.registerComponent('audio-handler', {
      init: function () {
        let playing = false;
        const audio = this.el.components.sound;
        this.el.setAttribute('src', Audio);
        this.el.addEventListener('mouseenter', () => {
          audio.playSound();
          playing = true;
        });
        this.el.addEventListener('mouseleave', () => {
            audio.stopSound();
          playing = false;
        });
      }
  });
  if (!aframe.components['on-click-subpage'])
    aframe.registerComponent('on-click-subpage', {
      init: function () {
        var el = this.el;
        el.addEventListener('click', function () {
          that.setState({isSubpage: true});
        });
      }
    });
    if (!aframe.components['video-handler'])
    aframe.registerComponent('video-handler', {
      init: function () {
        const video = document.getElementById('video');
        if ( video.readyState === 4 ) {
            video.play();
        }
      }
    });
    if (!aframe.components['on-click-back'])
    aframe.registerComponent('on-click-back', {
      init: function () {
        const { el } = this;
        el.addEventListener('click', () => {
          that.setState({isSubpage: false});
        });
      }
    });
  }
  componentWillUnmount() {
    delete aframe.components['audio-handler'];
    delete aframe.components['on-click-subpage'];
    delete aframe.components['video-handler'];
    delete aframe.components['on-click-back'];
  }
  render() {
    return (
      <article>
        <Helmet>
          <link rel="prefetch" as="video/mp4" href={Video} />
          <link rel="prefetch" as="video/mp4" href={Video} />
          <link rel="prefetch" as="image/jpg" href={MainLeft} />
          <link rel="prefetch" as="image/jpg" href={MainRight} />
          <link rel="prefetch" as="audio/mp3" href={Audio} />
          <link rel="prefetch" as="image/jpg" href={SubpageLeft} />
          <link rel="prefetch" as="image/jpg" href={SubpageRight} />
        </Helmet>
       <a-scene cursor="rayOrigin:mouse" scene-handler>
          <a-assets>
            <img id="leftMain" src={MainRight} alt="" />
            <img id="rightMain" src={MainLeft} alt="" />
            <img id="subpageLeft" src={SubpageRight} alt="" />
            <img id="subpageRight" src={SubpageLeft} alt="" />
            <video id="video" src={Video} width="160" height="90" loop autoPlay muted preload="auto" webkit-playsinline="true" playsInline />
          </a-assets>
          {/* <a-entity camera look-controls position="0 1.6 0" stereocam="eye:left;"></a-entity> */}
          <a-entity teleport-controls="startEvents: teleportstart; endEvents: teleportend"
            vive-controls="hand: left"
            oculus-touch-controls="hand: left"
            microsoft-motion-controls="hand: left"
            daydream-controls="left" gearvr-controls="left"
            camera look-controls stereocam="eye:left;">
          </a-entity>
          <a-entity teleport-controls="startEvents: teleportstart; endEvents: teleportend; type: line"
            vive-controls="hand: right"
            microsoft-motion-controls="hand: right"
            oculus-touch-controls="hand: right"
            daydream-controls="right" gearvr-controls="right" 
            camera look-controls stereocam="eye:right;">
          </a-entity>
          {
          this.state.isSubpage ? 
          <a-entity>
            <a-sky src="#subpageLeft" rotation="0 -90 0" stereo="eye:left"></a-sky>
            <a-sky src="#subpageRight" rotation="0 -90 0" stereo="eye:right"></a-sky>
            <a-circle position="-9 1.5 -9.5" color="#f00" class="clickable" radius="0.8" on-click-back></a-circle>
          </a-entity> :
          <a-entity>
            <a-sky src="#leftMain" rotation="0 -90 0" stereo="eye:left"></a-sky>
            <a-sky src="#rightMain" rotation="0 -90 0" stereo="eye:right"></a-sky>
            <a-video src="#video" width="15.9" height="9" position="-0.1 1.45 -26.6" video-handler></a-video>
            <a-sound src={Audio} autoplay="false" class="clickable" audio-handler>
              <a-box position="6 -2.5 -9.5" width="3.7" height="2.5" rotation="-13 3 1" color="transparent" opacity="0"></a-box>
            </a-sound>
            <a-circle position="-6 1.5 -9.5" color="#fff" class="clickable" radius="0.8" on-click-subpage></a-circle>
          </a-entity>}
          <a-entity position="0 0 0">
            <a-camera id="player">
              <a-entity cursor="fuse: true; fuseTimeout: 1500;" geometry="primitive: ring" material="color: red;
                shader: flat" position ="0 0 -1" scale="0.04 0.04 0.04">
              </a-entity>
            </a-camera>
          </a-entity>
          <a-entity laser-controls="hand: left" laser-controls raycaster="objects: .clickable; showLine:true;" line="color:#eee; opacity:0.33;"></a-entity>
          <a-entity laser-controls="hand: right" laser-controls raycaster="objects: .clickable; showLine:true;" line="color:#eee; opacity:0.33;"></a-entity>
        </a-scene>
      </article>
    );
  }
}
