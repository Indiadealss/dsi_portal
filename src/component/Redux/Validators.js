export function validateBasicDetails(data = {}) {
  const errors = {};
  const purpose = (data.purpose || "").trim();
  const category = (data.category || "").trim(); // <- store your radio pick here
  const type = (data.propertyType || "").trim();

  // Purpose required
  if (!purpose.includes(purpose)) {
    errors.purpose = "Select what you're looking to do (Sell / Rent / PG).";
  }

  // Category required (residential/commercial)
  if (!["residential", "commercial"].includes(category)) {
    errors.category = "Choose Residential or Commercial.";
  }

  // Property type required
  if (!type) {
    errors.propertyType = "Select a property type.";
    return errors;
  }

  // PG cannot be commercial
  if (purpose === "pg" && category === "commercial") {
    errors.propertyType = "PG listings must be Residential.";
    return errors;
  }

  if (category === "residential") {
    // must be a valid residential type
    if (!RESIDENTIAL_TYPES.includes(type)) {
      errors.propertyType = "Choose a valid residential property type.";
    }
  } else if (category === "commercial") {
    // if they picked a main commercial bucket that has subtypes, force a subtype
    if (
      COMMERCIAL_MAIN.includes(type) &&
      (COMMERCIAL_SUBTYPES[type] || []).length > 0
    ) {
      errors.propertyType = "Choose a specific commercial subtype.";
    }
    // optional: block residential types under commercial
    if (RESIDENTIAL_TYPES.includes(type)) {
      errors.propertyType = "Choose a valid commercial type.";
    }
  }

  return errors;
}

function validateLocation(data = {}) {
  const errors = {};

  // City is required
  if (!data.city || data.city.trim().length === 0) {
    errors.city = "Please select a valid city.";
  }

  // Locality required once city is picked
  if (!data.locality || data.locality.trim().length === 0) {
    errors.locality = "Please enter your locality.";
  }

  return errors;
}

function validateProfileProperty(data = {}) {
  const errors = {};

  if (!data.noBedroom) {
    errors.noBedroom = "Please select number of bedrooms.";
  }

  if (!data.noBathroom) {
    errors.noBathroom = "Please select number of bathrooms.";
  }

  // Balconies optional, no check

  if (!data.plotArea && !data.builtUpArea && !data.carpetArea) {
    errors.area = "Please enter at least one area detail (plot, built-up, or carpet).";
  }

  if (!data.totalFloor || isNaN(Number(data.totalFloor))) {
    errors.totalFloor = "Please enter total floors.";
  }

  if (!data.availability) {
    errors.availability = "Please select availability status.";
  } else {
    if (data.availability === "Ready to move" && !data.ageProperty) {
      errors.ageProperty = "Please select age of property.";
    }
    if (data.availability === "Under construction" && !data.possessionBy) {
      errors.possessionBy = "Please select possession timeline.";
    }
  }

  if (!data.ownership) {
    errors.ownership = "Please select ownership type.";
  }

  return errors;
}

function validatePhotoVideo(data = {}) {
  const errors = {};

  if (!data.video || data.video.length === 0) {
    errors.video = "Please upload at least one video of the property.";
  }

  return errors;
}


function validateAnemities(data = {}) {
  const errors = {};

  if (!data.otherRooms || data.otherRooms.trim() === "") {
    errors.otherRooms = "Please select at least one room type.";
  }

  if (!data.furnishing || data.furnishing.trim() === "") {
    errors.furnishing = "Please select furnishing status.";
  }

  if (!data.pricingDetails || data.pricingDetails.length === 0) {
    errors.pricingDetails = "Select at least one pricing option.";
  }

  return errors;
}


/** -----------------------
 * Master validator (stubs for next steps, we'll fill as you send them)
 * ----------------------*/
export function validateStep(step, data) {
  switch (step) {
    case 0:
      return validateBasicDetails(data);
    case 1:
      return validateLocation(data); // Location – next
    case 2:
      return validateProfileProperty(data); // Property Profile – next
    case 3:
      return validatePhotoVideo(data); // Photos/Video – next
    case 4:
      return validateAnemities(data); // Pricing/Others – next
    default:
      return {};
  }
}

