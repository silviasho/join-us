import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CommentIcon from '@material-ui/icons/Comment';
import Collapse from '@material-ui/core/Collapse';
import { List,  Input, Icon } from 'semantic-ui-react';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    icons: { color: "#ff9800" },

}));

export default function NestedList() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.root}
        >

<CommentIcon className={classes.icons} onClick={handleClick} />
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                            <List>
                                <List.Item>   <Icon name={'user outline'} size='big' /> great !!!!</List.Item>
                                <List.Item>  <Icon name={'user outline'} size='big' /> my friands told me </List.Item>
                                <List.Item>    <Icon name={'user outline'} size='big' /> lets add fun</List.Item>
                                <List.Item> <Icon name={'user outline'} size='big' /> i like this</List.Item>
                            </List>
                    </ListItem>
                    <Input
                                size='mini'
                                icon='comment'
                                name='searchText'
                                placeholder='add comment'
                            />
                </List>
            </Collapse>
        </List>
    );
} 