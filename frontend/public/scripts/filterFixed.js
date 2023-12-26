let navbar = document.querySelector('.filterBox');
let mainBox = document.querySelector('.mainBox');

function handleScroll() {
    let nsc = window.pageYOffset;
    // let nsc = document.documentElement.scrollTop;
    let bp1 = mainBox.offsetTop;
    let bp2 = bp1 + mainBox.offsetHeight - window.innerHeight;
    
    if (nsc > bp1) {
        navbar.style.position = 'fixed';
    } else {
        navbar.style.position = 'absolute';
    }
    
    if (nsc > bp2) {
        navbar.style.top = bp2 - nsc + 'px';
    } else {
        navbar.style.top = '0';
    }
}

window.addEventListener('scroll', handleScroll);
// handleScroll();