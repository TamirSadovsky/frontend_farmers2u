import React, { useState, useEffect } from 'react';
import { TextField, Grid } from '@mui/material';

function ProductList() {
  const [products, setProducts] = useState([{ name: '', price: '' }]);

  const handleChange = (i, event) => {
    const values = [...products];
    values[i][event.target.name] = event.target.value;
    setProducts(values);
  };

  useEffect(() => {
    // Add a new empty product if the last product is being edited
    const lastProduct = products[products.length - 1];
    if (lastProduct.name || lastProduct.price) {
      setProducts([...products, { name: '', price: '' }]);
    }
  }, [products]);

  return (
    <div>
      <Grid container marginRight={3.2} marginTop={1} spacing={2} direction="row">
        {products.map((product, idx) => (
          <React.Fragment key={idx}>
            <Grid item dir="rtl" xs={3}>
              <TextField
                label="מוצר"
                name="name"
                value={product.name}
                variant="outlined"
                onChange={(event) => handleChange(idx, event)}
                sx={{
                  width: '8em',
                  backgroundColor: '#ffffff',
                  '& label': {
                    left: 'unset',
                    right: '1.75rem',
                    transformOrigin: 'right',
                  },
                  '& legend': {
                    textAlign: 'right',
                  },
                }}
              />
            </Grid>
            <Grid item dir="rtl" xs={2.5}>
              <TextField
                label='מחיר לק"ג'
                name="price"
                value={product.price}
                variant="outlined"
                onChange={(event) => handleChange(idx, event)}
                inputProps={{ pattern: '\\d*' }} // allows only digits
                sx={{
                  width: '6em',
                  backgroundColor: '#ffffff',
                  '& label': {
                    left: 'unset',
                    right: '1.75rem',
                    transformOrigin: 'right',
                  },
                  '& legend': {
                    textAlign: 'right',
                  },
                }}
              />
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
    </div>
  );
}

export default ProductList;
