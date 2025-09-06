import { NavLink } from 'react-router-dom';
import classes from '../../resources/css/components/projects/project.module.css';;

function Project ({ data, index }) {
    return (
        <div className={classes.border}>
            <NavLink className={classes.project}
            to={data.navLink}
            key={`project_${index}`}>
                <video
                aria-label={data.altText}
                autoPlay
                loop
                muted
                playsInline>
                    <source src={data.videoSrc} type='video/mp4'/>
                    Video not showing..
                </video>
                <div className={classes.text}>
                    <div className={classes.backgroundH2}>
                        <h2>
                            {data.header}
                        </h2>
                    </div>
                    <div className={classes.backgroundP}>
                        {/* todo: make hover text accessible for phone/ limited dexterity and screen readers */}
                        <p>
                            {data.hoverText}
                        </p>
                    </div>
                </div>
            </NavLink>
        </div>
    );
}

export default Project;