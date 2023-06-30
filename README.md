# IU Hardware Monitoring Website

This project is a website to monitor a Monarch LCS hardware device used at IU. The website updates its data every 30 seconds and displays the following information:

- Video Inputs (Present/Not Present)
- Hardware (Online/Offline)
- Audio Input (Present/Not Present)
- Input Status

## Components

- `HardwareStatusComponent` for displaying the online/offline status of the hardware.
- `VideoInputComponent` for displaying whether video input is present.
- `AudioInputComponent` for displaying whether audio input is present.
- `StreamingComponent` for displaying the input status.

## Services

- `DeviceService` for sending commands to the device and retrieving data.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed the latest version of Node.js and npm. If not, you can download them [here](https://nodejs.org/en/download/).

## Running the Project

The website is deployed at [ct-test1.uits.indiana.edu](http://ct-test1.uits.indiana.edu). To run the project locally, you can follow these steps:

1. Clone the repository to your local machine.

```bash
git clone https://github.com/username/project-name.git
```

2. change directory to the project folder.

```bash
cd project-name
```

3. Install the dependencies.

```bash
npm install
```

4. Run the project.

```bash
npm run dev
```

## Contact

For any inquiries, please open an issue in the repository.