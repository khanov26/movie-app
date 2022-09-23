import {Box, styled} from "@mui/material";
import {alpha} from "@mui/material/styles";

const StyledTape = styled(Box)(({theme}) => ({
    display: 'flex',
    gap: theme.spacing(2),
    overflow: 'auto',
    paddingLeft: 0,
    paddingBottom: theme.spacing(4),
    listStyle: 'none',
    scrollbarColor: `${theme.palette.primary.main} ${alpha(theme.palette.primary.main, 0.4)}`,
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
        height: 10,
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: alpha(theme.palette.primary.main, 0.4),
        borderRadius: Number(theme.shape.borderRadius) * 2,
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.primary.main,
        borderRadius: Number(theme.shape.borderRadius) * 2,
    },
}));

export default StyledTape;
