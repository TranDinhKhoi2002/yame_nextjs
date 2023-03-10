import { printNumberWithCommas } from '@/common/utility/printPriceWithComma';
import { Box, Stack, Typography } from '@mui/material';

function GeneralInfor(props) {
  return (
    <Box sx={{ my: '12px' }}>
      <Typography sx={{ fontSize: '1.5rem', fontWeight: 500 }}>{props.name}</Typography>
      <Typography sx={{ my: '8px' }}>Mã số: {props.id}</Typography>
      {props.oldPrice ? (
        <Stack direction="row" alignItems="center">
          <Typography sx={{ fontSize: '1.125rem', fontWeight: 400, mr: '12px', textDecorationLine: 'line-through' }}>
            {printNumberWithCommas(props.oldPrice)}
          </Typography>
          <Typography sx={{ fontSize: '1.125rem', fontWeight: 400 }} className="text-primary">
            {printNumberWithCommas(props.price)} đ
          </Typography>
        </Stack>
      ) : (
        <Typography sx={{ fontSize: '1.5rem', fontWeight: 500 }} className="text-primary">
          {printNumberWithCommas(props.price)} đ
        </Typography>
      )}
    </Box>
  );
}

export default GeneralInfor;
