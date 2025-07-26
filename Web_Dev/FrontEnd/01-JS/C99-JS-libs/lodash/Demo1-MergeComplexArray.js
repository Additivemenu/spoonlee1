const _ = require("lodash");

// we have 2 complex arrays, we want to merge them based on question_id
const array1 = [
  {
    question_id: 160,
    question: "Beer – Chilled",
    photo_required: 1,
    stores: [
      {
        assign_id: 574703,
        store_id: "2822",
        store_name: "PARRAMATTA LL",
        answer: "Yes",
        answer_comments: null,
        photos: [
          {
            photo_type: "",
            photo_path:
              "http://liquorland.storetaskr.local/storage/store/154/tasks/mocs/574703/160/226bfde196e68f428f443cc19304c844.jpg",
            photo_thumb:
              "http://liquorland.storetaskr.local/images/icons/image-missing.svg",
            photo_origin: "",
            photo_name: "image.jpg",
            photo_hash: "226bfde196e68f428f443cc19304c844.jpg",
          },
        ],
        is_rejected: false,
        is_first: true,
      },
      {
        assign_id: 574705,
        store_id: "2968",
        store_name: "KINGSBURY LL",
        answer: "Yes",
        answer_comments: null,
        photos: [
          {
            photo_type: "",
            photo_path:
              "http://liquorland.storetaskr.local/storage/store/241/tasks/mocs/574705/160/d45c5d051d67d837c278bedb38d573fd.jpg",
            photo_thumb:
              "http://liquorland.storetaskr.local/images/icons/image-missing.svg",
            photo_origin: "",
            photo_name: "image.jpg",
            photo_hash: "d45c5d051d67d837c278bedb38d573fd.jpg",
          },
        ],
        is_rejected: false,
        is_first: true,
      },
      {
        assign_id: 574707,
        store_id: "3357",
        store_name: "NORTH PARRAMATTA LL",
        answer: "Yes",
        answer_comments: null,
        photos: [
          {
            photo_type: "",
            photo_path:
              "http://liquorland.storetaskr.local/storage/store/403/tasks/mocs/574707/160/54f99d835f6f34145399d330c6d67ff4.jpg",
            photo_thumb:
              "http://liquorland.storetaskr.local/images/icons/image-missing.svg",
            photo_origin: "",
            photo_name: "image.jpg",
            photo_hash: "54f99d835f6f34145399d330c6d67ff4.jpg",
          },
        ],
        is_rejected: false,
        is_first: true,
      },
      {
        assign_id: 574708,
        store_id: "3360",
        store_name: "MERRYLANDS LL",
        answer: "Yes",
        answer_comments: null,
        photos: [
          {
            photo_type: "",
            photo_path:
              "http://liquorland.storetaskr.local/storage/store/405/tasks/mocs/574708/160/7e7d2fb0bd54c4448647bcb55c1df564.jpg",
            photo_thumb:
              "http://liquorland.storetaskr.local/images/icons/image-missing.svg",
            photo_origin: "",
            photo_name: "image.jpg",
            photo_hash: "7e7d2fb0bd54c4448647bcb55c1df564.jpg",
          },
        ],
        is_rejected: false,
        is_first: true,
      },
    ],
  },
];

const array2 = [
  {
    question_id: 160,
    question: "Beer – Chilled",
    photo_required: 1,
    stores: [
      {
        assign_id: 574709,
        store_id: "3534",
        store_name: "KINGS LANGLEY LL",
        answer: "Yes",
        answer_comments: null,
        photos: [
          {
            photo_type: "application/json",
            photo_path:
              "http://liquorland.storetaskr.local/storage/store/482/tasks/mocs/574709/160/05fd4befbe105c032561c6204b2b51d7.jpeg",
            photo_thumb:
              "http://liquorland.storetaskr.local/images/icons/image-missing.svg",
            photo_origin: "",
            photo_name: "IMG_0305.jpeg",
            photo_hash: "05fd4befbe105c032561c6204b2b51d7.jpeg",
          },
          {
            photo_type: "application/json",
            photo_path:
              "http://liquorland.storetaskr.local/storage/store/482/tasks/mocs/574709/160/9e6fb523ba8f71f5fbf9b8e99cf34751.jpeg",
            photo_thumb:
              "http://liquorland.storetaskr.local/images/icons/image-missing.svg",
            photo_origin: "",
            photo_name: "IMG_0306.jpeg",
            photo_hash: "9e6fb523ba8f71f5fbf9b8e99cf34751.jpeg",
          },
          {
            photo_type: "application/json",
            photo_path:
              "http://liquorland.storetaskr.local/storage/store/482/tasks/mocs/574709/160/981abf158186ad581b5a65979c4e39ad.jpeg",
            photo_thumb:
              "http://liquorland.storetaskr.local/images/icons/image-missing.svg",
            photo_origin: "",
            photo_name: "IMG_0310.jpeg",
            photo_hash: "981abf158186ad581b5a65979c4e39ad.jpeg",
          },
        ],
        is_rejected: false,
        is_first: true,
      },
      {
        assign_id: 574710,
        store_id: "5467",
        store_name: "CRAIGIEBURN VILLAGE LL",
        answer: "Yes",
        answer_comments: null,
        photos: [
          {
            photo_type: "",
            photo_path:
              "http://liquorland.storetaskr.local/storage/store/700/tasks/mocs/574710/160/0b07a622f8f6c76b300a0e5dc89bc4e0.jpg",
            photo_thumb:
              "http://liquorland.storetaskr.local/images/icons/image-missing.svg",
            photo_origin: "",
            photo_name: "image.jpg",
            photo_hash: "0b07a622f8f6c76b300a0e5dc89bc4e0.jpg",
          },
        ],
        is_rejected: false,
        is_first: true,
      },
      {
        assign_id: 574711,
        store_id: "6102",
        store_name: "WEST BURLEIGH CEL LL",
        answer: "Yes",
        answer_comments: null,
        photos: [
          {
            photo_type: "application/json",
            photo_path:
              "http://liquorland.storetaskr.local/storage/store/743/tasks/mocs/574711/160/e79c6655a73b8a495dc201dfb9a34a69.jpg",
            photo_thumb:
              "http://liquorland.storetaskr.local/images/icons/image-missing.svg",
            photo_origin: "",
            photo_name: "image.jpg",
            photo_hash: "e79c6655a73b8a495dc201dfb9a34a69.jpg",
          },
          {
            photo_type: "application/json",
            photo_path:
              "http://liquorland.storetaskr.local/storage/store/743/tasks/mocs/574711/160/d936440937ddde420d077abbd0e36b7d.jpg",
            photo_thumb:
              "http://liquorland.storetaskr.local/images/icons/image-missing.svg",
            photo_origin: "",
            photo_name: "image_(2).jpg",
            photo_hash: "d936440937ddde420d077abbd0e36b7d.jpg",
          },
        ],
        is_rejected: false,
        is_first: true,
      },
      {
        assign_id: 574712,
        store_id: "6104",
        store_name: "PALM BEACH LL",
        answer: "Yes",
        answer_comments: null,
        photos: [
          {
            photo_type: "",
            photo_path:
              "http://liquorland.storetaskr.local/storage/store/745/tasks/mocs/574712/160/8b12bf47e6196ce8d0b0b4fa2ffe9d64.jpg",
            photo_thumb:
              "http://liquorland.storetaskr.local/images/icons/image-missing.svg",
            photo_origin: "",
            photo_name: "image.jpg",
            photo_hash: "8b12bf47e6196ce8d0b0b4fa2ffe9d64.jpg",
          },
        ],
        is_rejected: false,
        is_first: true,
      },
    ],
  },
];

// merge arr2 into arr1
const mergeArrays = (arr1, arr2) => {
    const merged = _.cloneDeep(arr1);
  
    arr2.forEach(question2 => {
      const question1 = _.find(merged, { question_id: question2.question_id }); // find the matching question in the merged array
      
      if (question1) {
        // merge stores array
        question1.stores = _.unionBy(question1.stores, question2.stores, 'assign_id');
      } else {
        merged.push(question2);
      }
    });
  
    return merged;
  };
  
  // Example usage
  const mergedArray = mergeArrays(array1, array2);
  console.log(JSON.stringify(mergedArray, null, 2));

  console.log(mergeArrays[0].stores.length)
