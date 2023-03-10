import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import {
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  Tab,
  Tabs,
} from '@mui/material';
import Button from '@/common/components/UI/Button';
import { TabContext, TabPanel } from '@mui/lab';
import ThinPersonIcon from '@/common/components/UI/ThinPersonIcon';
import NormalPersonIcon from '@/common/components/UI/NormalPersonIcon';
import FatPersonIcon from '@/common/components/UI/FatPersonIcon';
import CloseIcon from '@mui/icons-material/Close';
import TableSizes from './TableSizes';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: { xs: 'translate(-50%, -50%)', md: 'translate(-50%, -42%)' },
  width: { xs: '100%', md: '700px' },
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 3,
};

export default function SizeGuideModal({ isVisible, onClose, onSelectSize }) {
  const [value, setValue] = useState('1');
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [body, setBody] = useState('thin');
  const [feeling, setFeeling] = useState('tight');
  const [selectedSize, setSelectedSize] = useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleHeightChange = (event, newValue) => {
    setHeight(newValue);
  };

  const handleWeightChange = (event, newValue) => {
    setWeight(newValue);
  };

  const handleBodyChange = (event, newValue) => {
    setBody(newValue);
  };

  const handleFeelingChange = (event, newValue) => {
    setFeeling(newValue);
  };

  const handleChooseSize = () => {
    console.log(height, weight, body, feeling);
    if (height >= 165 && height <= 168 && weight >= 56 && weight <= 62) {
      if (body === 'fat') {
        setSelectedSize('wrong');
        return;
      }

      if (feeling === 'wide') {
        setSelectedSize('M');
        return;
      }

      setSelectedSize('S');
      return;
    }

    if (height >= 169 && height <= 172 && weight >= 63 && weight <= 69) {
      if (body === 'fat') {
        setSelectedSize('wrong');
        return;
      }

      if (feeling === 'wide') {
        setSelectedSize('L');
        return;
      }

      setSelectedSize('M');
      return;
    }

    if (height >= 173 && height <= 176 && weight >= 70 && weight <= 76) {
      if (body === 'thin') {
        setSelectedSize('wrong');
        return;
      }

      if (feeling === 'wide') {
        setSelectedSize('XL');
        return;
      }

      setSelectedSize('L');
      return;
    }

    if (height >= 177 && height <= 180 && weight >= 77 && weight <= 83) {
      if (body === 'thin') {
        setSelectedSize('wrong');
        return;
      }

      setSelectedSize('XL');
      return;
    }

    if (height >= 181 && weight >= 84) {
      setSelectedSize('XL');
      return;
    }

    setSelectedSize('wrong');
  };

  const handleChooseAgain = () => {
    setSelectedSize(null);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isVisible}
        onClose={onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        sx={{ overflow: 'scroll' }}
      >
        <Fade in={isVisible}>
          <Box sx={style}>
            <IconButton sx={{ position: 'absolute', right: 30, top: 17 }} onClick={onClose}>
              <CloseIcon />
            </IconButton>
            {!selectedSize && (
              <Box>
                <Typography id="transition-modal-title" variant="h5" component="h2" sx={{ textAlign: 'center' }}>
                  Ch???n size
                </Typography>
                <TabContext value={value}>
                  <Box sx={{ width: '100%', bgcolor: 'background.paper', mt: 2 }}>
                    <Tabs value={value} onChange={handleChange} centered>
                      <Tab label="H?????ng d???n ch???n size" value="1" />
                      <Tab label="B???ng size" value="2" />
                    </Tabs>
                  </Box>
                  <TabPanel value="1">
                    <Typography sx={{ textAlign: 'center', fontWeight: 400 }}>Th??ng s??? c???a b???n</Typography>
                    <Typography>Chi???u cao</Typography>
                    <Stack direction="row" spacing={3}>
                      <Slider value={height} size="small" onChange={handleHeightChange} min={1} max={200} />
                      <Typography variant="body1">{height}&nbsp;cm</Typography>
                    </Stack>

                    <Typography sx={{ mt: 4 }}>C??n n???ng</Typography>
                    <Stack direction="row" spacing={3}>
                      <Slider value={weight} size="small" onChange={handleWeightChange} min={1} max={150} />
                      <Typography variant="body1">{weight}&nbsp;kg</Typography>
                    </Stack>

                    <Typography sx={{ my: 5, textAlign: 'center', fontWeight: 400 }}>D??ng ng?????i c???a b???n</Typography>
                    <FormControl sx={{ width: '100%' }}>
                      <RadioGroup
                        row
                        aria-labelledby="body-group"
                        name="body-group"
                        value={body}
                        onChange={handleBodyChange}
                      >
                        <Grid container>
                          <Grid item xs={4} sx={{ textAlign: 'center', '& svg': { mx: 'auto' } }}>
                            <ThinPersonIcon />
                            <FormControlLabel value="thin" control={<Radio />} label="G???y" sx={{ mt: 2 }} />
                          </Grid>
                          <Grid item xs={4} sx={{ textAlign: 'center', '& svg': { mx: 'auto' } }}>
                            <NormalPersonIcon />
                            <FormControlLabel value="normal" control={<Radio />} label="B??nh th?????ng" sx={{ mt: 2 }} />
                          </Grid>
                          <Grid item xs={4} sx={{ textAlign: 'center', '& svg': { mx: 'auto' } }}>
                            <FatPersonIcon />
                            <FormControlLabel value="fat" control={<Radio />} label="B??o" sx={{ mt: 2 }} />
                          </Grid>
                        </Grid>
                      </RadioGroup>
                    </FormControl>

                    <Typography sx={{ mt: 5, textAlign: 'center', fontWeight: 400 }}>B???n mu???n m???c th??? n??o</Typography>
                    <FormControl sx={{ width: '100%' }}>
                      <RadioGroup
                        row
                        aria-labelledby="body-group"
                        name="body-group"
                        value={feeling}
                        onChange={handleFeelingChange}
                      >
                        <Grid container>
                          <Grid item xs={4} sx={{ textAlign: 'center', '& svg': { mx: 'auto' } }}>
                            <FormControlLabel value="tight" control={<Radio />} label="M???c ??m" sx={{ mt: 2 }} />
                          </Grid>
                          <Grid item xs={4} sx={{ textAlign: 'center', '& svg': { mx: 'auto' } }}>
                            <FormControlLabel value="fit" control={<Radio />} label="M???c v???a" sx={{ mt: 2 }} />
                          </Grid>
                          <Grid item xs={4} sx={{ textAlign: 'center', '& svg': { mx: 'auto' } }}>
                            <FormControlLabel value="wide" control={<Radio />} label="M???c r???ng" sx={{ mt: 2 }} />
                          </Grid>
                        </Grid>
                      </RadioGroup>
                    </FormControl>

                    <Box sx={{ textAlign: 'center', mt: 3 }}>
                      <Button className="rounded-none px-10" onClick={handleChooseSize}>
                        T??m size
                      </Button>
                    </Box>
                  </TabPanel>
                  <TabPanel value="2">
                    <TableSizes />
                  </TabPanel>
                </TabContext>
              </Box>
            )}
            {selectedSize && selectedSize !== 'wrong' && (
              <Box sx={{ textAlign: 'center' }}>
                <Typography id="transition-modal-title" variant="h5" component="h2" sx={{ textAlign: 'center' }}>
                  Size ph?? h???p v???i b???n
                </Typography>
                <Box sx={{ my: 6 }}>
                  <Typography
                    sx={{ px: 4, py: 1, border: '1px solid #111111', display: 'inline-block', fontWeight: 500 }}
                  >
                    {selectedSize}
                  </Typography>
                </Box>
                <Box>
                  <Button className="rounded-none px-10 font-medium" onClick={onSelectSize.bind(this, selectedSize)}>
                    Ch???n size {selectedSize}
                  </Button>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Button className={`rounded-none font-medium !bg-transparent text-gray`} onClick={handleChooseAgain}>
                    T??i mu???n ch???n size kh??c
                  </Button>
                </Box>
              </Box>
            )}

            {selectedSize && selectedSize === 'wrong' && (
              <Box sx={{ textAlign: 'center' }}>
                <Typography id="transition-modal-title" variant="h5" component="h2" sx={{ textAlign: 'center' }}>
                  Size ph?? h???p v???i b???n
                </Typography>
                <Typography sx={{ fontWeight: 400, my: 3, px: 4 }}>
                  D?????ng nh?? nh???ng th??ng tin b???n ch???n kh??ng kh???p v???i nhau ho???c ch??ng t??i kh??ng t??m th???y size n??o ph?? h???p
                  v???i b???n
                </Typography>
                <Button className="rounded-none px-10 font-medium mt-3" onClick={handleChooseAgain}>
                  Ch???n l???i
                </Button>
              </Box>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
