const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim(){
    var tl = gsap.timeline();

    tl.from("#nav",{
        y:'-10',
        opacity:0,
        duration:1.5,
        ease:Expo.easeInOut
    })

    .to(".boundingelement",{
        y:0,
        duration:2,
        ease:Expo.easeInOut,
        delay:-1,
        stagger: 0.2
    })
    .from("#homefooter",{
        y:'-10',
        opacity:0,
        duration:1.5,
        delay: -1,
        ease:Expo.easeInOut
    })
}

//skew the circle when the mouse is moving
var timeout;

function circleSkew(){
    //define default scale value
    var xscale = 1;
    var yscale = 1;

    var xprev= 0;
    var yprev = 0;

    window.addEventListener("mousemove", function(dets){
        var xdiff = dets.clientX - xprev;

        xscale = gsap.utils.clamp(.8,1.2,xdiff);

        xprev = dets.clientX;


        var ydiff = dets.clientY - yprev;

        yscale = gsap.utils.clamp(.8,1.2,ydiff);

        yprev = dets.clientY;

        circleMouseFollower(xscale,yscale);
        
        timeout = this.setTimeout(function(){
            document.querySelector('#minicircle').style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
        }, 100);

    });
}

function circleMouseFollower(xscale,yscale){
    window.addEventListener("mousemove",function(dets){
        document.querySelector('#minicircle').style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    })
}

circleMouseFollower();

firstPageAnim();

circleSkew();

document.querySelectorAll(".elem")
.forEach(function(elem){
    var rotate=0;
    var diffrot=0;

    elem.addEventListener("mouseleave",function(dets){
        gsap.to(elem.querySelector("img"),{
            opacity:0,
            ease:Power3,
        });
    });

    elem.addEventListener("mousemove",function(details){
        var diffrot = details.clientY - elem.getBoundingClientRect().top;
        diff=details.clientX - rotate;
        rotate = details.clientX;
        gsap.to(elem.querySelector("img"),{
            opacity:1,
            ease:Power3,
            top: diff,
            left: details.clientX,
            rotate:  gsap.utils.clamp(-20,20,diff),
            duration:0.5,
        });
    });
});

function formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm ;
    return strTime;
}

function displayCurrentTime() {
    const now = new Date();
    const formattedTime = formatTime(now);
    document.getElementById('currentTime').textContent = formattedTime;
}

// Call the function to display time
displayCurrentTime();

// Optional: update the time every minute
setInterval(displayCurrentTime, 60000);