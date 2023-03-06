import * as React from "react";
import { Avatar, Modal, notification, Tooltip, Select, Tag } from "antd";
import moment from "moment-timezone";
import {
  cookieKeys,
  notificationTypes,
  emailRegex,
  moduleAvatar,
  themeByEvent,
  appStatusColors,
  AppConfiguration,
} from "./appconst";
import {
  EnvironmentOutlined,
  GlobalOutlined,
  MailFilled,
  MailOutlined,
  ManOutlined,
  PhoneFilled,
  PhoneOutlined,
  WomanOutlined,
} from "@ant-design/icons";
import Badge from "antd/lib/badge";
import { L } from "@lib/abpUtility";
import { Status } from "@models/global";

const { colorByLetter } = moduleAvatar,
  { Option } = Select;

export function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

export function getPreviewFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export const notifyWarning = (message: string, description: string) => {
  notification.warning({ message, description });
};
export const notifyError = (title: string, content: string) => {
  Modal.error({ title, content });
};

export const notifySuccess = (message: string, description: string) => {
  notification.success({ message, description });
};

export const mapActiveStatus = (isActive) => {
  return isActive
    ? new Status(L("ACTIVE"), appStatusColors.success)
    : new Status(L("INACTIVE"), appStatusColors.error);
};

export function isNullOrEmpty(text) {
  if (!text) {
    return true;
  }

  text = text.trim();
  return text.length < 1;
}

export function isObjectUndefinedOrNull(obj) {
  return obj === undefined || obj === null;
}

export function isValidEmail(text) {
  if (!text || isNullOrEmpty(text)) {
    return false;
  }
  return emailRegex.test(text);
}

export function filterOptions(input, option) {
  return option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
}

export function arrayToObject(arr, key, value) {
  return arr.reduce((obj, current) => {
    return { ...obj, [current[key]]: current[value] };
  }, {});
}

export function getFirstLetterAndUpperCase(text) {
  return text && text.length ? text.charAt(0).toUpperCase() : "G";
}

export function hexToRGB(hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
        result[3],
        16
      )}`
    : null;
}

export function getCountDownXmasMessage(loaderMessage) {
  // Find the distance between now and the count down date
  // Get today's date and time
  let countDownDate = new Date(new Date().getFullYear(), 11, 25).getTime();
  let now = new Date().getTime();
  let distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  return days === 0
    ? "Merry Christmas!"
    : (loaderMessage || "").replace("{0}", `${days}`);
}

export function initMultiLanguageField() {
  return (abp.localization.languages || []).map((lang) => {
    return { languageName: lang.name, icon: lang.icon, value: "" };
  });
}

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function mapMultiLanguageField(existLangs) {
  return (abp.localization.languages || []).map((lang) => {
    let currentLang =
      (existLangs || []).find((item) => item.languageName === lang.name) || {};
    return { ...currentLang, languageName: lang.name, icon: lang.icon };
  });
}

export function isBetween(start, end, current) {
  // Format date to remove second
  const startStr = moment(start).format("MM/DD/YYYY HH:mm");
  const endStr = moment(end).format("MM/DD/YYYY HH:mm");
  const currentStr = moment(current).format("MM/DD/YYYY HH:mm");
  const mStart = moment(startStr);
  const mEnd = moment(endStr);
  const mCurrent = moment(currentStr);
  return mStart.isBefore(mCurrent) && mEnd.isAfter(mCurrent);
}

export function isSame(timeA, timeB) {
  const timeAStr = moment(timeA).format("MM/DD/YYYY HH:mm");
  const timeBStr = moment(timeB).format("MM/DD/YYYY HH:mm");
  const mTimeA = moment(timeAStr);
  const mTimeB = moment(timeBStr);

  return mTimeA.isSame(mTimeB);
}
export function renderCompanyAvatar(
  value,
  secondInfo?,
  row?,
  onClick?,
  thirdInfo?
) {
  if (!row) {
    row = {};
  }

  const firstLetter = getFirstLetterAndUpperCase(value || "G");
  const color = colorByLetter(firstLetter);
  return (
    <>
      <div
        className="table-cell-profile"
        onClick={() => (onClick ? onClick() : "")}
      >
        <div>
          <Avatar src={row.profilePictureUrl} style={{ background: color }}>
            {firstLetter}
          </Avatar>
        </div>
        <div className="info ml-2">
          <div className="full-name text-truncate">{value}</div>
          {secondInfo && (
            <div className="phone text-truncate">{secondInfo}</div>
          )}
          {thirdInfo && <div className="phone text-truncate">{thirdInfo}</div>}
        </div>
      </div>
    </>
  );
}

export function renderContactInfo(row) {
  return (
    <div className="small">
      {row.phone && (
        <div className="phone">
          <PhoneOutlined className="mr-1" />
          {row.phone}
        </div>
      )}
      {row.emailAddress && (
        <div className="email">
          <MailOutlined className="mr-1" />
          {row.emailAddress}
        </div>
      )}
      {row.website && (
        <div className="email">
          <GlobalOutlined className="mr-1" />
          {row.website}
        </div>
      )}
      {row.address && (
        <div className="email">
          <EnvironmentOutlined className="mr-1" />
          {row.address}
        </div>
      )}
    </div>
  );
}

export function renderAvatar(value, row?, showUserName?, secondInfo?) {
  if (!row) {
    row = {};
  }

  const firstLetter = getFirstLetterAndUpperCase(value || "G");
  const color = colorByLetter(firstLetter);
  return (
    <>
      <div className="table-cell-profile">
        <div>
          <Avatar src={row.profilePictureUrl} style={{ background: color }}>
            {firstLetter}
          </Avatar>
        </div>
        <div className="info ml-2">
          <div className="full-name text-truncate">
            {L(row.gender ? "GENDER_MR" : "GENDER_MS")} {value}
          </div>
          {secondInfo && (
            <div className="phone text-truncate text-muted">{secondInfo}</div>
          )}
          {row.phoneNumber && (
            <div className="phone text-truncate text-muted">
              {row.phoneNumber}
            </div>
          )}
          {row.emailAddress && !showUserName && (
            <div className="email text-truncate text-muted">
              {row.emailAddress}
            </div>
          )}
          {row.userName && !!showUserName && (
            <div className="phone text-truncate text-muted">{row.userName}</div>
          )}
        </div>
      </div>
    </>
  );
}

export function renderContact(phoneNumber?, email?) {
  return (
    <>
      <div className="table-cell-profile">
        <div className="info ml-2">
          {phoneNumber && (
            <div className="phone text-truncate text-muted">
              <PhoneFilled className="mr-1" />
              {phoneNumber}
            </div>
          )}
          {email && (
            <div className="email text-truncate text-muted">
              <MailFilled className="mr-1" /> {email}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export function renderGender(value) {
  return <>{value ? <ManOutlined /> : <WomanOutlined />}</>;
}

export function renderOptions(options, log?, showTooltip?) {
  if (log) {
    console.log(options);
  }
  if (showTooltip === true) {
    return (options || []).map((option, index) => (
      <Option key={index} value={option.value || option.id}>
        <Tooltip title={option.label || option.name}>
          {option.label || option.name}
        </Tooltip>
      </Option>
    ));
  } else {
    return (options || []).map((option, index) => (
      <Option key={index} value={option.value || option.id}>
        {option.displayName ||
          option.label ||
          option.name ||
          option.code ||
          option.contactName ||
          option.businessName}
      </Option>
    ));
  }
}
export function renderCustomerOptions(options, log?, showTooltip?) {
  if (log) {
    console.log(options);
  }
  return (options || []).map((option, index) => (
    <Option key={index} value={option.id}>
      {showTooltip ? (
        <Tooltip title={`${option.phoneNumber} - ${option.emailAddress}`}>
          {option.displayName}
        </Tooltip>
      ) : (
        option.displayName
      )}
    </Option>
  ));
}

export function renderDate(value) {
  if (value) {
    // TODO using global format
    value = moment(value).format("DD/MM/YYYY");
  }

  return value;
}

export function renderDateTime(value) {
  if (value) {
    // TODO using global format
    value = moment(value).format("DD/MM/YYYY HH:mm");
  }

  return value;
}

export function renderTime(value) {
  if (value) {
    // TODO using global format
    value = moment(value).format("HH:mm");
  }

  return value;
}

export function renderIsActive(value) {
  return value === true ? (
    <Tooltip title={L("ACTIVE")}>
      <Badge status="success" className="badge-without-text" />
    </Tooltip>
  ) : (
    <Tooltip title={L("INACTIVE")}>
      <Badge status="error" className="badge-without-text" />
    </Tooltip>
  );
}

export function renderLogo(logoUrl, projectName, size = 64) {
  const firstLetter = getFirstLetterAndUpperCase(projectName || "G");
  const color = colorByLetter(firstLetter);
  return (
    <>
      <div className="table-cell-profile">
        <div>
          <Avatar
            shape="square"
            size={size}
            src={logoUrl}
            style={{ background: color }}
          >
            {firstLetter}
          </Avatar>
        </div>
      </div>
    </>
  );
}

export function renderTag(value, color) {
  return (
    <Tag className="cell-round mr-0" color={color}>
      {value}
    </Tag>
  );
}

export function compressImage(file, maxSize) {
  let image = new Image();
  let canvas = document.createElement("canvas");
  let dataURItoBlob = function (dataURI) {
    let bytes =
      dataURI.split(",")[0].indexOf("base64") >= 0
        ? atob(dataURI.split(",")[1])
        : unescape(dataURI.split(",")[1]);
    let mime = dataURI.split(",")[0].split(":")[1].split(";")[0];
    let max = bytes.length;
    let ia = new Uint8Array(max);
    for (let i = 0; i < max; i++) ia[i] = bytes.charCodeAt(i);
    return new Blob([ia], { type: mime });
  };
  let reader = new FileReader();
  let resize = function () {
    let width = image.width;
    let height = image.height;
    if (width > height) {
      if (width > maxSize) {
        height *= maxSize / width;
        width = maxSize;
      }
    } else {
      if (height > maxSize) {
        width *= maxSize / height;
        height = maxSize;
      }
    }
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d")?.drawImage(image, 0, 0, width, height);
    let dataUrl = canvas.toDataURL("image/jpeg");
    return dataURItoBlob(dataUrl);
  };
  return new Promise(function (ok, no) {
    if (!file.type.match(/image.*/)) {
      no(new Error("Not an image"));
      return;
    }
    reader.onload = function (readerEvent) {
      image.onload = function () {
        return ok(resize());
      };
      image.src = readerEvent.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

// Link prepare
export function buildFileUrlWithEncToken(fileUrl) {
  return fileUrl && fileUrl.length
    ? `${fileUrl}&encToken=${encodeURIComponent(
        abp.utils.getCookieValue(cookieKeys.encToken)
      )}`
    : "";
}

export function prepareLinkQueryString(params, url) {
  if (!isObjectUndefinedOrNull(params)) {
    let index = 0;
    let query = "";
    Object.keys(params).forEach((key) => {
      let bullet = index === 0 ? "?" : "&";
      let value = params[key];
      if (Array.isArray(params[key])) {
        value = "";
        params[key].forEach((item) => {
          value += (value.length ? "&" : "") + `${key}=${item}`;
        });
        query = query + bullet + value;
      } else {
        query = query + bullet + key + "=" + value;
      }
      index++;
    });

    return url + query;
  }
  return url;
}

export function image2Base64(img: File | Blob | undefined) {
  if (!img) {
    return Promise.resolve("");
  }
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.readAsDataURL(img);
  });
}

export function getLocalLocale() {
  // ts trick to avoid type checking
  const _navigator: any = navigator;
  return (
    _navigator.userLanguage ||
    (navigator.languages &&
      navigator.languages.length &&
      navigator.languages[0]) ||
    navigator.language ||
    _navigator.browserLanguage ||
    _navigator.systemLanguage ||
    "en"
  );
}

export function formatCurrency(
  val: string | number,
  locale?: string,
  currency = "VND"
) {
  const convertedNum = Number(val);
  if (isNaN(convertedNum)) return val;

  let _locale = locale || getLocalLocale();

  return new Intl.NumberFormat(_locale, { style: "currency", currency }).format(
    convertedNum
  );
}

export function formatNumber(
  val: string | number,
  locale = "vi",
  currency = "vnd"
) {
  const convertedNum = Number(val);
  if (isNaN(convertedNum)) return "";

  let _locale = locale || getLocalLocale();

  return new Intl.NumberFormat(_locale).format(convertedNum);
}

export function inputCurrencyFormatter(value, locale = "vi", symbol = "đ") {
  return `${symbol} ${(value + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

export function inputCurrencyParse(value, locale = "vi", symbol = "đ") {
  return value
    .replace(symbol, "")
    .replace(" ", "")
    .replace(/\$\s?|(,*)/g, "");
}

export function inputNumberFormatter(value, locale = "vi") {
  return `${(value + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

export function inputNumberParse(value, locale = "vi") {
  return value.replace(/\$\s?|(,*)/g, "");
}

export function compactObject(obj) {
  const keys = Object.keys(obj);
  return keys.reduce((result, key) => {
    if (!!obj[key]) result[key] = obj[key];
    return result;
  }, {});
}

// Notification
export function getNotificationAction(userNotification: any) {
  if (
    userNotification.notification.notificationName ===
    "App.DownloadInvalidImported"
  ) {
    return notificationTypes.download;
  }
  if (
    userNotification.notification?.data?.properties.Id &&
    userNotification.notification?.data?.properties.Type
  ) {
    return notificationTypes.gotoDetail;
  }

  return notificationTypes.text;
}

export function changeBackgroundByEvent(event?, type?) {
  //Start the snow default options you can also make it snow in certain elements, etc.
  const { events } = themeByEvent;
  switch (event) {
    case events.xmasNight:
    case events.xmasHouse:
    case events.xmasSanta: {
      let js,
        fjs = document.getElementsByTagName("script")[0];
      if (document.getElementById("blog-xtraffic-snow-effect")) return;
      js = document.createElement("script");
      js.id = "blog-xtraffic-snow-effect";
      js.src = "assets/snow-storm.js";
      fjs.parentNode && fjs.parentNode.insertBefore(js, fjs);
      break;
    }
    default: {
    }
  }
}

export function buildFileUrl(fileUrl) {
  let baseUrl = (AppConfiguration.remoteServiceBaseUrl || "").substring(
    0,
    (AppConfiguration.remoteServiceBaseUrl || "").length - 1
  );
  return fileUrl && fileUrl.length
    ? `${baseUrl}${fileUrl}?enc_auth_token=${encodeURIComponent(
        abp.utils.getCookieValue(cookieKeys.encToken)
      )}`
    : "";
}

export function inputPercentFormatter(value, locale = "vi") {
  return `${(value + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")} %`;
}

export function inputPercentParse(value, locale = "vi") {
  return value
    .replace("%", "")
    .replace(" ", "")
    .replace(/\$\s?|(,*)/g, "");
}
