/** @jsx jsx */
import PropTypes from 'prop-types';
import { jsx } from 'theme-ui';
import { Link as GatsbyLink } from 'gatsby';

export const Link = ({
  isButton,
  url,
  children,
  // ...props
}) => {
  return isButton ? (
    <GatsbyLink
      // {...props}
      activeClassName="active"
      to={url}
      sx={{
        py: 2,
        px: 3,
        borderRadius: 4,
        textDecoration: 'none',
        fontWeight: 600,
        background: 'black',
        color: 'white',
        textAlign: 'center',
        '&:hover': {
          background: 'gray',
        },
      }}
    >
      {children}
    </GatsbyLink>
  ) : (
    <GatsbyLink
      // {...props}
      activeClassName="active"
      to={url}
      sx={{
        color: 'inherit',
        '&:hover': {
          color: 'gray',
        },
      }}
    >
      {children}
    </GatsbyLink>
  );
};

Link.propTypes = {
  children: PropTypes.node.isRequired,
  isButton: PropTypes.bool,
  url: PropTypes.string.isRequired,
};
