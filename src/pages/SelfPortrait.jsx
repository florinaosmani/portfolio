import React, { useState, useEffect } from 'react';

import classes from '../resources/css/pages/selfportrait.module.css';
import catPic from '../resources/media/cat.PNG';

const leavesOffset = [
 {
    top: 0,
    left: 0
 },
 {
    top: 90,
    left: 90
 },
 {
    top: 45,
    left: -135
 },
 {
    top: 120,
    left: 220
 }
];

const leafOffset = [
    {
        top: 100,
        left: 100
    },
    {
        top: 200,
        left: 370
    },
    {
        top: -80,
        left: 62
    },
    {
        top: 400,
        left: 150
    },
    {
        top: 20,
        left: 250
    },
    {
        top: 150,
        left: -20
    },
    {
        top: 440,
        left: 300
    },
    {
        top: 310,
        left: 440
    },
    {
        top: 250,
        left: 260
    },
    {
        top: 190,
        left: 90
    }
];

function SelfPortrait () {
    
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[]);


    /* i used useState here instead of using redux because this seems simpler
    this makes it so the animation works if the window is resized while its already playing */
    const getDivHeight = () => {
        if (window.matchMedia('only screen and (min-width: 1300px)').matches) {
            return 600;
        } else if (window.matchMedia('only screen and (max-width: 500px)').matches) {
            return 250;
        } else {
            return 450;
        }
    };
    
    const [divHeight, setDivHeight] = useState(getDivHeight());

    useEffect(()=>{
        const handleResize = () => {
            setDivHeight(getDivHeight());
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    },[])
    
    /* a function that will change the individual leaf values depending on screen size
    cos it doesnt look right with the "regular-size" values 
    conditionals only for positive values, since i thankfully didn't use any negative ones
    that would be out of range for the smallest size :)))))*/

    const [leafOffsetUsed, setLeafOffsetUsed] = useState(leafOffset);

    useEffect(() => {
        if (divHeight === 250) {
            const newOffset = leafOffset.map(leaf => {
                let top = leaf.top;
                let left = leaf.left;
                if (top > 250) {
                    top -= 250;
                }
                if (left > 250) {
                    left -= 250;
                }
                return {
                    top: top,
                    left: left
                }
            });
            setLeafOffsetUsed(newOffset);

        } else if (divHeight === 450) {
            setLeafOffsetUsed(leafOffset);

        } else if (divHeight === 600) {
            /* changes every second leaf's left value for ~variety~
            i liked the vertical variety already*/
            const newOffset = leafOffset.map((leaf, index) => {
                let left = leaf.left;

                if (index % 2 === 0 && left < 400) {
                    left += 200;
                }
                return {
                    top: top,
                    left: left
                }
            });
            setLeafOffsetUsed(newOffset);
        }
        
    }, [divHeight])

    return (
        <div className={classes.portraitContainer}>
            <div className={classes.background}>
                {/* I kept adding more leafs and at some point instead of copying all my CSS i thought maybe doing this with JS would be easier
                    leaf positions are stored in arrays and then 4 divs are created with different positions. the leaves themselves also have different positions
                    and each leaf has a "loop-leaf" that has a top calucated so that it will loop smoothly 
                    2nd: added a third leaf, don't remove, it fills the gap for the .leaves divs with top != 0 since i didn't know how else to do it*/}
                {leavesOffset.map((leaves, index) => {
                    return (
                        <div 
                        key={`leaves_${index}`}
                        className={classes.leaves}
                        style={{top: `${leaves.top}px`, left: `${leaves.left}px`}}
                        >
                            {leafOffsetUsed.map(((leaf, i) => {
                                return (
                                    <React.Fragment
                                    key={`fr_${index}_${i}`}>
                                        <div 
                                        className={classes.leaf}
                                        style={{top: `${leaf.top}px`, left: `${leaf.left}px`}}
                                        key={`leafFirst_${index}_${i}`}></div>
                                        <div 
                                        className={classes.leaf}
                                        style={{top: `calc(${leaf.top}px - ${divHeight}px)`, left: `${leaf.left}px`}}
                                        key={`leafLoop_${index}_${i}`}></div>
                                        <div 
                                        className={classes.leaf}
                                        style={{top: `calc(${leaf.top}px + ${divHeight}px)`, left: `${leaf.left}px`}}
                                        key={`leafLoopAbove_${index}_${i}`}></div>
                                        <div 
                                        className={classes.leaf}
                                        style={{top: `calc(${leaf.top}px - ${2 * divHeight}px)`, left: `${leaf.left}px`}}
                                        key={`leafLoopBelow_${index}_${i}`}></div>
                                    </React.Fragment>
                                )
                            }))}
                        </div>
                    )
                })}
            </div>
            <div className={classes.portrait}>
                <div className={classes.face}>
                    <div className={`${classes.eye} ${classes.leftEye}`}>
                        <div className={classes.pupil}></div>
                    </div>
                    <div className={`${classes.eye} ${classes.rightEye}`}>
                    <div className={classes.pupil}></div>
                    </div>
                    <div className={classes.smile}></div>
                    <div className={classes.hairStyle}>
                        <div className={`${classes.hair} ${classes.leftHair}`}></div>
                        <div className={`${classes.hair} ${classes.rightHair}`}></div>
                    </div>
                </div>
                <div className={classes.body}>
                    <div className={classes.shirtDesign}>
                        <img src={catPic} />
                    </div>
                    <div className={classes.arms}>
                        <div className={`${classes.leftArm} ${classes.arm}`}>
                            <div className={classes.hand}></div>
                        </div>
                        <div className={`${classes.rightArm} ${classes.arm}`}>
                            <div className={classes.hand}></div>
                        </div>
                    </div>
                </div>
                <div className={classes.legs}>
                    <div className={`${classes.leftLeg} ${classes.leg}`}>
                        <div className={`${classes.shoe} ${classes.leftShoe}`}>
                            <div className={classes.shoeLace}>
                                <div className={`${classes.loop} ${classes.leftLoop}`}></div>
                                <div className={`${classes.loop} ${classes.rightLoop}`}></div>
                                <div className={`${classes.string} ${classes.leftString}`}></div>
                                <div className={`${classes.string} ${classes.rightString}`}></div>
                            </div>
                        </div>
                    </div>
                    <div className={`${classes.rightLeg} ${classes.leg}`}>
                        <div className={`${classes.shoe} ${classes.rightShoe}`}>
                            <div className={classes.shoeLace}>
                                <div className={`${classes.loop} ${classes.leftLoop}`}></div>
                                <div className={`${classes.loop} ${classes.rightLoop}`}></div>
                                <div className={`${classes.string} ${classes.leftString}`}></div>
                                <div className={`${classes.string} ${classes.rightString}`}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SelfPortrait;