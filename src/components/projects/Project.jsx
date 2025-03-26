import { NavLink } from 'react-router-dom';
import classes from '../../resources/css/components/projects/project.module.css';;

function Project ({ data, index }) {
    return (
        <NavLink className={classes.project}
        to={data.navLink}
        key={`project_${index}`}>
            <video
            aria-label={data.altText}
            autoPlay
            loop
            muted>
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
                    <p>
                        {data.hoverText}
                    </p>
                </div>
            </div>
        </NavLink>
    );
}

export default Project;