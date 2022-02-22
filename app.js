
//Displays the original image after being uploaded
function displayOriginalImage(event) {
  if (event.files.length != 0) {
    if (checkFileName(event.files[0].name)) {
      document.getElementById("inputImage").src = window.URL.createObjectURL(event.files[0]);
      document.getElementById("originalImage").style.display = "initial";
      document.getElementById("transformation").style.display = "initial";
      document.getElementById("result").style.display = "none";
    }
  }
}

//Makes sure the uploaded file is a png or jpg image 
function checkFileName(fileName) {
  if (fileName == "") {
    alert("Browse to upload a valid File with png or jpg extension");
    return false;
  }
  else if (fileName.split(".")[1].toUpperCase() == "PNG" || fileName.split(".")[1].toUpperCase() == "JPG")
    return true;
  else {
    alert("File with " + fileName.split(".")[1] + " is invalid. Upload a valid file with png or jpg extensions");
    return false;
  }
}

//Displays the corresponding form to the selected transformation and hides the other forms
function showTransformForm() {
  const increaseBrightnessForm = document.getElementById("increaseBrightnessForm");
  const decreaseBrightnessForm = document.getElementById("decreaseBrightnessForm");
  const increaseContrastForm = document.getElementById("increaseContrastForm");
  const decreaseContrastForm = document.getElementById("decreaseContrastForm");
  const InverseForm = document.getElementById("InverseForm");

  const mylist = document.getElementById("myList");

  //Storing the type chosen in a variable
  transformType = mylist.options[mylist.selectedIndex].text;

  //Displaying to the user the type he chose by changing the text element of id= transformType to the selected type
  document.getElementById("transformType").value = mylist.options[mylist.selectedIndex].text;

  if (transformType == "Increase Brightness") {
    document.getElementById("increaseBrightnessInputs").style.display = "initial";
    document.getElementById("decreaseBrightnessInputs").style.display = "none";
    document.getElementById("increaseContrastInputs").style.display = "none";
    document.getElementById("decreaseContrastInputs").style.display = "none";
    document.getElementById("InverseInputs").style.display = "none";
  } else if (transformType == "Decrease Brightness") {
    document.getElementById("increaseBrightnessInputs").style.display = "none";
    document.getElementById("decreaseBrightnessInputs").style.display = "initial";
    document.getElementById("increaseContrastInputs").style.display = "none";
    document.getElementById("decreaseContrastInputs").style.display = "none";
    document.getElementById("InverseInputs").style.display = "none";

  } else if (transformType == "Increase Contrast") {
    document.getElementById("increaseBrightnessInputs").style.display = "none";
    document.getElementById("decreaseBrightnessInputs").style.display = "none";
    document.getElementById("increaseContrastInputs").style.display = "initial";
    document.getElementById("decreaseContrastInputs").style.display = "none";
    document.getElementById("InverseInputs").style.display = "none";

  } else if (transformType == "Decrease Contrast") {
    document.getElementById("increaseBrightnessInputs").style.display = "none";
    document.getElementById("decreaseBrightnessInputs").style.display = "none";
    document.getElementById("increaseContrastInputs").style.display = "none";
    document.getElementById("decreaseContrastInputs").style.display = "initial";
    document.getElementById("InverseInputs").style.display = "none";
  }else {
    document.getElementById("increaseBrightnessInputs").style.display = "none";
    document.getElementById("decreaseBrightnessInputs").style.display = "none";
    document.getElementById("increaseContrastInputs").style.display = "none";
    document.getElementById("decreaseContrastInputs").style.display = "none";
    document.getElementById("InverseInputs").style.display = "initial";
  }

  // Listener to the event of submiting the increase brightness form
  increaseBrightnessForm.addEventListener("submit", (e) => {
    e.preventDefault()
    var ib = document.getElementById("ib").value
    increaseBrightness(Number(ib))
  });
  //DONE....Write your code here for EventListeners for the other forms using the constants you will create in the transform function
  decreaseBrightnessForm.addEventListener("submit", (e) => {
    e.preventDefault()
    var db = document.getElementById("db").value
    decreaseBrightness(Number(db))
  });

  increaseContrastForm.addEventListener("submit", (e) => {
    e.preventDefault()
    var obd = document.getElementById("obd").value
    var tbd = document.getElementById("tbd").value
    var odb = document.getElementById("odb").value
    var tdb = document.getElementById("tdb").value
    
    increaseContrast(Number(obd), Number(tbd), Number(odb), Number(tdb))
  });

  decreaseContrastForm.addEventListener("submit", (e) => {
    e.preventDefault()
    var obd = document.getElementById("obd1").value
    var tbd = document.getElementById("tbd1").value
    var odb = document.getElementById("odb1").value
    var tdb = document.getElementById("tdb1").value
    
    decreaseContrast(Number(obd), Number(tbd), Number(odb), Number(tdb))
  });
  InverseForm.addEventListener("submit", (e) => {
    e.preventDefault()
    Inverse()
  });

  //Applies pixel-wise transformations to increase brightness
  function increaseBrightness(ib) {
    const img = document.getElementById("inputImage");
    const canvas = document.getElementById("resultImage");
    const ctx = canvas.getContext('2d');

    var transformedImage = [];
    var val;

    //Images are displayed in the RGBA format so a greyscale pixel could look like (25,25,25,255)
    rgba = getRGBAValues(img, canvas, ctx);

    for (i = 0; i < img.width * img.height * 4; i += 4) {
      val = rgba[i] + ib;
      if (val > 255) {
        val = 255;
      }
      transformedImage.push(val, val, val, rgba[i + 3]);
    }

    displayResultImage(img, transformedImage, ctx);

  }

  //Applies pixel-wise transformations to decrease brightness
  function decreaseBrightness(db) {
    const img = document.getElementById("inputImage");
    const canvas = document.getElementById("resultImage");
    const ctx = canvas.getContext('2d');

    var transformedImage = [];
    var val;

    //Images are displayed in the RGBA format so a greyscale pixel could look like (25,25,25,255)
    
    rgba = getRGBAValues(img, canvas, ctx);

    for (i = 0; i < img.width * img.height * 4; i += 4) {
      val = rgba[i] - db;
      if (val < 0) {
        val = 0;
      }
      transformedImage.push(val, val, val, rgba[i + 3]);
    }

    displayResultImage(img, transformedImage, ctx);

  }


    //Applies pixel-wise transformations to increase contrast
    function increaseContrast(obd,tbd,odb,tdb) {
      const img = document.getElementById("inputImage");
      const canvas = document.getElementById("resultImage");
      const ctx = canvas.getContext('2d');
  
      var transformedImage = [];
      var val;
  
      //Images are displayed in the RGBA format so a greyscale pixel could look like (25,25,25,255)
      rgba = getRGBAValues(img, canvas, ctx);
      //check that obd,tbd,odb,tdb are sorted AND delta T>delta O
      if(tbd<obd && obd<odb && odb<tdb){
      for (i = 0; i < img.width * img.height * 4; i += 4) {
        if (rgba[i] < obd) {
          val = rgba[i] * (tbd/obd);
        }
        else if(rgba[i]>obd & rgba[i]<odb){
          val=((rgba[i]-obd)*((tdb-tbd)/(odb-obd)))+tbd;
          if(val>255){
            val=255;
          }else if(val<0){
            val=0;
          }

        }
        
        else{
          val=((rgba[i]-odb)*((255-tdb)/(255-odb)))+tdb
        }
        transformedImage.push(val, val, val, rgba[i + 3]);
      }
  
        displayResultImage(img, transformedImage, ctx);
      }
    }

    function decreaseContrast(obd,tbd,odb,tdb) {
      const img = document.getElementById("inputImage");
      const canvas = document.getElementById("resultImage");
      const ctx = canvas.getContext('2d');
  
      var transformedImage = [];
      var val;
  
      //Images are displayed in the RGBA format so a greyscale pixel could look like (25,25,25,255)
      rgba = getRGBAValues(img, canvas, ctx);
      //check that obd,tbd,odb,tdb are sorted AND delta T>delta O
      if(obd<tbd && tbd<tdb && tdb<odb){
      for (i = 0; i < img.width * img.height * 4; i += 4) {
        if (rgba[i] < obd) {
          val = rgba[i] * (tbd/obd);
        }
        else if(rgba[i]>obd & rgba[i]<odb){
          val=((rgba[i]-obd)*((tdb-tbd)/(odb-obd)))+tbd;
          if(val>255){
            val=255;
          }else if(val<0){
            val=0;
          }

        }
        
        else{
          val=((rgba[i]-odb)*((255-tdb)/(255-odb)))+tdb
        }
        transformedImage.push(val, val, val, rgba[i + 3]);
      }
  
        displayResultImage(img, transformedImage, ctx);
      }
    }


    //Applies pixel-wise transformations to decrease contrast
    

    function Inverse() {
      const img = document.getElementById("inputImage");
      const canvas = document.getElementById("resultImage");
      const ctx = canvas.getContext('2d');
  
      var transformedImage = [];
      var val;
  
      //Images are displayed in the RGBA format so a greyscale pixel could look like (25,25,25,255)
      rgba = getRGBAValues(img, canvas, ctx);
  
      for (i = 0; i < img.width * img.height * 4; i += 4) {
        val = 255-rgba[i];
        transformedImage.push(val, val, val, rgba[i + 3]);
      }
  
      displayResultImage(img, transformedImage, ctx);
  
    }


  //Extracts rgba 1D array of all the pixels in the original image
  function getRGBAValues(img, canvas, ctx) {
    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);

    var rgba = ctx.getImageData(
      0, 0, img.width, img.height
    ).data;
    return rgba;
  }

  //Displays the transformed image
  function displayResultImage(img, transformedImage, ctx) {
    //Get a pointer to the current location in the image.
    var palette = ctx.getImageData(0, 0, img.width, img.height); //x,y,w,h
    //Wrap your array as a Uint8ClampedArray
    palette.data.set(new Uint8ClampedArray(transformedImage)); // assuming values 0..255, RGBA, pre-mult.
    //Repost the data.
    ctx.putImageData(palette, 0, 0);
    document.getElementById("result").style.display = "initial";
  }
}  