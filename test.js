<div className='comingUpContainer'>
<h2 className='nextText'>Coming up</h2>
{secondVideoData.map((secondVideo, index) => (                
  <div
    className='secondaryVideoCon'
    key={index}
    onClick={() => handleSecondaryVideoClick(secondVideo)}
  >                  
<video width="350" height="200" className='playinVid' 
onClick={() => addVideoToHistory({ videoId: secondVideo.id })}
>
<source src={secondVideo.videoFile} type="video/mp4" />
</video>
<div className='secondTitle'>
<p>{truncateString(secondVideo.title, 40)}</p>
  </div>                 
<div>
<div className='secondaryVideoInfo'>
<img src={secondVideo.profPhoto} width={30} height={30} className='secondProfInfo' alt='secondaryVideoProfImg'/>
<div className='nameCont'>
<h2>{secondVideo.displayName}</h2>
<div className='dateViews'>
<p>{`${secondVideo.views || 0} Views`}</p>
  <p>{secondVideo.postTime}</p>
</div>
</div>
</div>
</div>
  </div>            
))}
</div>