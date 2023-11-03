import React from 'react';
import EditPost from './edit_modal';
import dayjs from 'dayjs';



const EditPostWrapper = ({ open, onClose, original_post }) => {
    const [startTime, endTime] = original_post.time.split('-');

    const post = {
        initial_text: original_post.desc, 
        initial_value: dayjs(original_post.date, 'MM/DD/YYYY'),
        initial_value2: dayjs(`1970-01-01T${startTime}`),
        initial_value3: dayjs(`1970-01-01T${endTime}`),
        initial_products: adjust_products(original_post.post_products || ""),
        initial_address: original_post.location,
        initial_vegan: original_post.vegan,
        initial_organic: original_post.organic,
        id: original_post.id,
    }


    function adjust_products(products){
      return products.split('#');
    }

    
  return (
    <EditPost post={post} open={open} onClose={onClose}/>
  );
};

export default EditPostWrapper;