# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## [2.3.1] - 2024/04/09

### Changed

- Updated to Google Consent Mode V2 requirements


## [2.3.0] - 2024/04/04

### Changed

- Adjust modal styles for google CLS optimization 


## [2.2.1] - 2024/04/04

### Fixed

- Duplicated buttons id
- Ajust modal height to 100dvh


## [2.2.0] - 2023/07/24

### Changed

- Refactor eraseAllCookies function


## [2.1.1] - 2023/07/20

### Added

- Google Tag Manager Consent Modes custom events


## [2.1.0] - 2023/07/18

### Added

- Google Tag Manager Consent Modes custom events


## [2.0.4] - 2023/07/18

### Added

- Possibility of customize border color for primary button


## [2.0.3] - 2023/06/20

### Fixed

- Fix eraseAllCookies function


## [2.0.2] - 2023/06/20

### Fixed

- Unified delete cookies in acceptCookies function


## [2.0.1] - 2023/06/20

### Fixed

- Google Tag Manager update event


## [2.0.0] - 2023/06/20

### Fixed

- Google Tag Manager consent settings


## [1.1.0] - 2023/06/20

### Fixed

- Delete all cookies when change configuration

## [1.0.24] - 2023/05/8

### Fixed

- Change locale "ca_es" to "ca"

## [1.0.23] - 2023/05/4

### Fixed

- Check if 'cookie_consent' cookie exists in localStorage

## [1.0.22] - 2023/04/3

### Fixed

- Check if 'cookie_consent' cookie exists instead of 'strictlyNecessaryCookies'

## [1.0.21] - 2023/03/31

### Fixed

- "Rechazar" text

## [1.0.20] - 2023/03/31

### Added

- Reject all button

## [1.0.10]

### Fixed

- Modal scroll auto on Y asis
- Spacing first title when we click "manage cookies"

## [1.0.9]

### Fixed

- Modal max height

## [1.0.8]

### Changed

- Modal z-index

## [1.0.7]

### Changed

- Initial values off

## [1.0.6]

### Added

- Doc example y readme updated

### Fixed

- Check correctly first interaction

## [1.0.5]

### Fixed

- Modal height when we press "manage cookies" on mobile devices.
- Checkbox visibility on Safari.

### Changed

- Primary action button (accept all cookies) more obvious.
- Removed margin from X asis in button block on mobile devices.


## [1.0.4]

### Fixed

- Open modal on first load
- Initial load all true


## [1.0.3]

- Fixed cookiesPolicyLink


## [1.0.2]

- Italian
- French
- Catalan
- Portugese
- Dutch


## [1.0.1]

- German


## [1.0.0]

### Added
- Selection selected if any
- File import all locales
- Button open popup
- Open popup after loading event
- Temprary default colors (TODO set some nicer colors)
- Default english noticeText, added a mention to cookie policy page with link
- Colors added
- Replace cookiesPolicyLink in noticeText
- Default English texts
- First working version without colors
- Documentation wip
- Styles
- Added spanish locale


### Changed
- Only one object in cookies