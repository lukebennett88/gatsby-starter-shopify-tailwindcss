/** @jsx jsx */
import PropTypes from 'prop-types';
import { jsx } from 'theme-ui';
import Img from 'gatsby-image';

export const Thumbnail = ({ src, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      sx={{
        cursor: 'pointer',
        border: '1px solid gray',
        padding: 1,
        '&:focus': {
          outline: 'none',
          borderColor: 'black',
        },
      }}
    >
      <Img fluid={src.localFile.childImageSharp.fluid} />
    </button>
  );
};

Thumbnail.propTypes = {
  onClick: PropTypes.func,
  src: PropTypes.object,
};
