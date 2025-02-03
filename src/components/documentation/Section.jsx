import classes from '../../resources/css/pages/documentation.module.css';

/* todo: check if contrast for the code sections is high enough
    else change the css pls */
function Section({ section }) {
    return (
        <section id={section.id} className={classes.section}>
            <h2>
                {section.header}
            </h2>
            {section.content.map((pieceOfContent, index) => {
                switch(pieceOfContent.type) {
                    case 'paragraph':
                        return (
                            <p className={classes.p} key={`p_${index}`}>
                                {pieceOfContent.data}
                            </p>
                        );
                    case 'code-video':
                        return (
                            <div className={classes.codeVideo} key={`cv_${index}`}>
                                <pre>
                                    <code className={pieceOfContent.data.language}>
                                        {pieceOfContent.data.code}
                                    </code>
                                </pre>
                                <video
                                    src={pieceOfContent.data.video.src}
                                    type={pieceOfContent.data.video.type}
                                    className={classes[pieceOfContent.data.video.className]}
                                    aria-label={pieceOfContent.data.video.ariaLabel}
                                    autoPlay
                                    loop
                                    muted
                                    >
                                    This video cannot be displayed.
                                </video>
                            </div>
                        );
                    case 'code':
                        return (
                            <div className={classes.code} key={`c_${index}`}>
                            <pre>
                                <code className={pieceOfContent.data.language}>
                                    {pieceOfContent.data.code}
                                </code>
                            </pre>
                            </div>
                            );
                    case 'code-code':
                        return (
                            <div className={classes.codeCode} key={`cc_${index}`}>
                                <pre>
                                    <code className={pieceOfContent.data.language1}>
                                        {pieceOfContent.data.code1}
                                    </code>
                                </pre>
                                <pre>
                                    <code className={pieceOfContent.data.language2}>
                                        {pieceOfContent.data.code2}
                                    </code>
                                </pre>
                            </div>
                        );
                    default: 
                        return null;
                }
            })}
        </section>
    )
}

export default Section;