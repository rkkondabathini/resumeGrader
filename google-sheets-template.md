# Google Sheets Template Setup

## Sheet Structure

Create a Google Sheet with the following structure:

### Tab Name: "ResumeData"

| Column A | Column B | Column C | Column D | Column E |
|----------|----------|----------|----------|----------|
| **Student Code** | **Auth Code** | **Resume Link** | **Resume Status** | **Feedback** |
| S001 | AUTH123 | https://drive.google.com/file/d/1ABC... | Cleared | Excellent resume! Well formatted and comprehensive. |
| S002 | AUTH456 | https://drive.google.com/file/d/2DEF... | Not Cleared | Please improve the formatting and add more details to experience section. |
| S003 | AUTH789 | https://drive.google.com/file/d/3GHI... | Grading Pending | |
| S004 | AUTH012 | https://drive.google.com/file/d/4JKL... | Cleared | Good work on the project descriptions. |

## Important Notes

1. **Tab Name**: The tab must be named exactly "ResumeData" (case-sensitive)
2. **Headers**: The first row must contain the exact column headers shown above
3. **Student Code**: Should be unique identifiers (e.g., S001, S002, etc.)
4. **Auth Code**: Secret codes for student authentication
5. **Resume Link**: Must be public Google Drive links
6. **Resume Status**: Can be "Cleared", "Not Cleared", or "Grading Pending"
7. **Feedback**: Free text from the grading team

## Status Meanings

- **Cleared**: Resume meets all requirements
- **Not Cleared**: Resume needs updates (students can submit new links)
- **Grading Pending**: New resume submitted, awaiting review

## Sample Data for Testing

Here are some sample entries you can use for testing:

```
Student Code: S001
Auth Code: AUTH123
Resume Link: https://drive.google.com/file/d/1ABC123DEF456/view?usp=sharing
Resume Status: Cleared
Feedback: Excellent resume! Well formatted and comprehensive.

Student Code: S002
Auth Code: AUTH456
Resume Link: https://drive.google.com/file/d/2DEF456GHI789/view?usp=sharing
Resume Status: Not Cleared
Feedback: Please improve the formatting and add more details to experience section.

Student Code: S003
Auth Code: AUTH789
Resume Link: https://drive.google.com/file/d/3GHI789JKL012/view?usp=sharing
Resume Status: Grading Pending
Feedback: (leave blank for pending status)
```

## Sharing Permissions

1. Click the "Share" button in your Google Sheet
2. Add your service account email (from the JSON credentials file)
3. Give "Editor" access
4. Make sure the service account can edit the sheet

## Sheet ID

To find your Sheet ID:
1. Open your Google Sheet
2. Look at the URL: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit`
3. Copy the Sheet ID (the long string between `/d/` and `/edit`)

Example: If your URL is `https://docs.google.com/spreadsheets/d/1ABC123DEF456GHI789JKL012MNO345PQR678STU901/edit`
Then your Sheet ID is: `1ABC123DEF456GHI789JKL012MNO345PQR678STU901` 