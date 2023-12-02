/**
 * * Types for PostStatus values.
 * @readonly
 * @type {string} UserRole
 * @param {string} DRAFT - value of this params is DRAFT
 * @param {string} PUBLISHED - value of this params is PUBLISHED
 * @param {string} ARCHIVED - value of this params is ARCHIVED
 * @param {string} ARR - values as elements in ARR
 */

export type PostStatus = {
  DRAFT: 'DRAFT';
  PUBLISHED: 'PUBLISHED';
  ARCHIVED: 'ARCHIVED';
  ARR: ['DRAFT', 'PUBLISHED', 'ARCHIVED'];
};
