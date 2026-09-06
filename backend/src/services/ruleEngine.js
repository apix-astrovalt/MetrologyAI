const REQUIRED_FIELDS = [
  {
    key: "manufacturer",
    name: "Manufacturer / Packer Details",
  },
  {
    key: "netQuantity",
    name: "Net Quantity",
  },
  {
    key: "mrp",
    name: "Maximum Retail Price (MRP)",
  },
  {
    key: "manufacturingDate",
    name: "Manufacturing / Packing Date",
  },
  {
    key: "consumerCare",
    name: "Consumer Care Details",
  },
  {
    key: "countryOfOrigin",
    name: "Country of Origin",
  },
];

const checkCompliance = (data) => {
  const checks = [];
  const issues = [];

  REQUIRED_FIELDS.forEach((field) => {
    const value = data[field.key];

    const isPresent =
      value !== null &&
      value !== undefined &&
      String(value).trim() !== "" &&
      String(value).trim().toLowerCase() !== "not detected";

    checks.push({
      name: field.name,
      value: isPresent ? value : "Not detected",
      status: isPresent ? "pass" : "fail",
    });

    if (!isPresent) {
      issues.push(
        `${field.name} is missing or could not be detected.`
      );
    }
  });

  const passed = checks.filter(
    (check) => check.status === "pass"
  ).length;

  const failed = checks.filter(
    (check) => check.status === "fail"
  ).length;

  const score = Math.round(
    (passed / checks.length) * 100
  );

  let status = "pass";

  if (score < 100 && score >= 60) {
    status = "warning";
  }

  if (score < 60) {
    status = "fail";
  }

  return {
    score,
    status,
    passed,
    failed,
    checks,
    issues,
  };
};

module.exports = {
  checkCompliance,
};