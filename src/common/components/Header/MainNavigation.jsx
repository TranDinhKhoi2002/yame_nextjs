import Menu from '../Popper/Menu/Menu';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useSelector } from 'react-redux';
import { selectCategories } from '@/redux/slices/data';
import { Box } from '@mui/material';

function MainNavigation() {
  const categories = useSelector(selectCategories);
  const mainCategories = [...categories].slice(0, 4);
  const detailCategories = [...categories].slice(-2);

  return (
    <Box component="nav" sx={{ display: { xs: 'none', lg: 'block' } }}>
      <ul className="flex">
        {mainCategories.map((category, index) => (
          <li key={index} className="py-0 px-5">
            {category.types.length > 0 ? (
              <Menu items={category.types}>
                <Link
                  className="transition duration-300 text-[#F4F6F8] hover:text-primary"
                  href={{
                    pathname: `/category/${category._id}`,
                    query: { title: category.name },
                  }}
                  as={`/category/${category._id}`}
                >
                  {category.name}
                  <KeyboardArrowDownIcon sx={{ ml: '2px', fontSize: '24px' }} />
                </Link>
              </Menu>
            ) : (
              <Link
                className="transition duration-300 text-[#F4F6F8] hover:text-primary"
                href={{
                  pathname: `/category/${category._id}`,
                  query: { title: category.name },
                }}
                as={`/category/${category._id}`}
              >
                {category.name}
              </Link>
            )}
          </li>
        ))}

        <li>
          <Menu detail={true} items={detailCategories}>
            <Box sx={{ transition: 'all linear 300ms' }} className="text-[#F4F6F8] cursor-pointer hover:text-primary">
              <MenuIcon sx={{ ml: '6px', fontSize: '24px' }} />
              <KeyboardArrowDownIcon sx={{ ml: '6px', fontSize: '24px' }} />
            </Box>
          </Menu>
        </li>
      </ul>
    </Box>
  );
}

export default MainNavigation;
