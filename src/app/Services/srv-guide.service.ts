import { Injectable } from '@angular/core';
import { Int_Guide } from '../Interfaces/int-guide';

@Injectable({
  providedIn: 'root',
})
export class Srv_Guide {
  constructor() {}

  mock_Guides: Int_Guide[] = [
    {
      UserId: 5,
      GuideId: 1,
      AreasOfExpertise: [1, 2, 3], // הוספת מערך של מספרים
      ReligiousId: 1,
      CertificatesFiles: [
        new File(['תוכן של תעודה 1'], 'certificate1.pdf', {
          type: 'application/pdf',
        }),
        new File(['תוכן של תעודה 2'], 'certificate2.pdf', {
          type: 'application/pdf',
        }),
      ] as File[],
      resumeFiles: new File(['תוכן של קורות חיים 5'], 'resume5.txt', {
        type: 'text/plain',
      }),
    },
    {
      UserId: 6,
      GuideId: 2,
      AreasOfExpertise: [4, 5, 6], // הוספת מערך של מספרים
      ReligiousId: 1,
      CertificatesFiles: [
        new File(['תוכן של תעודה 3'], 'certificate3.pdf', {
          type: 'application/pdf',
        }),
        new File(['תוכן של תעודה 4'], 'certificate4.pdf', {
          type: 'application/pdf',
        }),
      ] as File[],
      resumeFiles: new File(['תוכן של קורות חיים 6'], 'resume6.txt', {
        type: 'text/plain',
      }),
    },
    {
      UserId: 7,
      GuideId: 3,
      AreasOfExpertise: [7, 8, 9], // הוספת מערך של מספרים
      ReligiousId: 2,
      CertificatesFiles: [
        new File(['תוכן של תעודה 5'], 'certificate5.pdf', {
          type: 'application/pdf',
        }),
        new File(['תוכן של תעודה 6'], 'certificate6.pdf', {
          type: 'application/pdf',
        }),
      ] as File[],
      resumeFiles: new File(['תוכן של קורות חיים 7'], 'resume7.txt', {
        type: 'text/plain',
      }),
    },
    {
      UserId: 8,
      GuideId: 4,
      AreasOfExpertise: [10, 1, 2], // הוספת מערך של מספרים
      ReligiousId: 3,
      CertificatesFiles: [
        new File(['תוכן של תעודה 7'], 'certificate7.pdf', {
          type: 'application/pdf',
        }),
        new File(['תוכן של תעודה 8'], 'certificate8.pdf', {
          type: 'application/pdf',
        }),
      ] as File[],
      resumeFiles: new File(['תוכן של קורות חיים 8'], 'resume8.txt', {
        type: 'text/plain',
      }),
    },
    {
      UserId: 9,
      GuideId: 5,
      AreasOfExpertise: [3, 4, 5], // הוספת מערך של מספרים
      ReligiousId: 4,
      CertificatesFiles: [
        new File(['תוכן של תעודה 9'], 'certificate9.pdf', {
          type: 'application/pdf',
        }),
        new File(['תוכן של תעודה 10'], 'certificate10.pdf', {
          type: 'application/pdf',
        }),
      ] as File[],
      resumeFiles: new File(['תוכן של קורות חיים 9'], 'resume9.txt', {
        type: 'text/plain',
      }),
    },
    {
      UserId: 10,
      GuideId: 6,
      AreasOfExpertise: [3, 4, 5], // הוספת מערך של מספרים
      ReligiousId: 3,
      CertificatesFiles: [
        new File(['תוכן של תעודה 11'], 'certificate11.pdf', {
          type: 'application/pdf',
        }),
        new File(['תוכן של תעודה 12'], 'certificate12.pdf', {
          type: 'application/pdf',
        }),
      ] as File[],
      resumeFiles: new File(['תוכן של קורות חיים 10'], 'resume10.txt', {
        type: 'text/plain',
      }),
    },
    {
      UserId: 11,
      GuideId: 7,
      AreasOfExpertise: [3, 4, 5], // הוספת מערך של מספרים
      ReligiousId: 3,
      CertificatesFiles: [
        new File(['תוכן של תעודה 31'], 'certificate11.pdf', {
          type: 'application/pdf',
        }),
        new File(['תוכן של תעודה 52'], 'certificate12.pdf', {
          type: 'application/pdf',
        }),
      ] as File[],
      resumeFiles: new File(['תוכן של קורות חיים 11'], 'resume10.txt', {
        type: 'text/plain',
      }),
    },
  ];
  GetGuides() {
    return this.mock_Guides;
  }

  GetLastGuideId(): number {
    const guideIds = this.mock_Guides.map((guide) => guide.GuideId);
    return Math.max(...guideIds);
  }
  addGuide(
    UserId: number,
    GuideId: number,
    AreasOfExpertise: number[],
    ReligiousId: number,
    CertificatesFiles: File[],
    resumeFiles: File,
  ) {
    this.mock_Guides.push({
      UserId,
      GuideId,
      AreasOfExpertise,
      ReligiousId,
      CertificatesFiles,
      resumeFiles,
    });
  }
  userExist(userId: number): boolean {
    return this.mock_Guides.some((g) => g.UserId === userId);
  }
  searchByUserId(userId: number) {
    return this.mock_Guides.find((g) => g.UserId == userId);
  }
}
