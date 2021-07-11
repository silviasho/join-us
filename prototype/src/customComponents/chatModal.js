import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { Segment, Comment,Icon } from 'semantic-ui-react';
import MessageHeader from '../messages/messageHeader';
import MessageForm from '../messages/messageForm'
import { useSpring, animated } from 'react-spring/web.cjs';



const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }
}));

const Fade = React.forwardRef(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter();
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited();
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});

Fade.propTypes = {
    children: PropTypes.element,
    in: PropTypes.bool.isRequired,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
};

export default function ChatModal(props) {
    const classes = useStyles();
    const { isOpen, seter } = props;

    useEffect(
        () => {
            seter(isOpen);
        },
        [isOpen]
    );
    const handleClose = () => {
        seter(false);
    };




    return (
        <div>
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={classes.modal}
                open={isOpen}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={isOpen}>
                    <React.Fragment>
                        <MessageHeader />
                        <Segment>
                            <Comment.Group className="messages">
                                <Icon name={'comment alternate outline'} size='huge'  />
                                <Icon name={'comment alternate outline'} size='huge' />
                            </Comment.Group>
                        </Segment>
                        <MessageForm />
                    </React.Fragment>


                </Fade>
            </Modal>
        </div>
    );
}


