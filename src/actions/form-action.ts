'use server'

import { getFormStatsByUserId } from '@/api/form-stars-api'
import { defaultBackgroundColor, defaultPrimaryColor } from '@/constants'
import { generateUniqueId } from '@/lib/helpers'
import { prisma } from '@/lib/prisma'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export async function fetchFormStats() {
  try {
    const session = getKindeServerSession()
    const user = await session.getUser()

    if (!user) {
      return {
        success: false,
        message: 'Unauthorized to use this resource.',
      }
    }

    const {
      conversionRate,
      engagementRate,
      totalForms,
      totalResponses,
      views,
    } = await getFormStatsByUserId(user.id)

    return {
      success: true,
      conversionRate,
      engagementRate,
      totalForms,
      totalResponses,
      views,
    }
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong.',
      error,
    }
  }
}

export async function createForm(data: { name: string; description: string }) {
  try {
    const session = getKindeServerSession()
    const user = await session.getUser()

    if (!user) {
      return {
        success: false,
        message: 'Unauthorized to use this resource.',
      }
    }

    const jsonBlocks = JSON.stringify([
      {
        id: generateUniqueId(),
        blockType: 'RowLayout',
        attributes: {},
        isLocked: true,
        childBlocks: [
          {
            id: generateUniqueId(),
            blockType: 'Heading',
            attributes: {
              label: data.name || 'Untitled form',
              level: 1,
              fontSize: '4x-large',
              fontWeight: 'normal',
            },
          },
          {
            id: generateUniqueId(),
            blockType: 'Paragraph',
            attributes: {
              label: 'Paragraph',
              text: data.description || 'Add a description here.',
              fontSize: 'small',
              fontWeight: 'normal',
            },
          },
        ],
      },
    ])

    const formSettings = await prisma.formSettings.create({
      data: {
        primaryColor: defaultPrimaryColor,
        backgroundColor: defaultBackgroundColor,
      },
    })

    const form = await prisma.form.create({
      data: {
        name: data.name,
        description: data.description,
        userId: user.id,
        creatorName: user?.given_name || '',
        settingsId: formSettings.id,
        jsonBlocks,
      },
    })

    if (!form) {
      return {
        success: false,
        message: 'Could not create form, please try again.',
      }
    }

    return {
      success: true,
      message: 'Form created successfully.',
      form,
    }
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong.',
      error,
    }
  }
}

export async function fetchAllForms() {
  try {
    const session = getKindeServerSession()
    const user = await session.getUser()

    if (!user) {
      return {
        success: false,
        message: 'Unauthorized to use this resource.',
      }
    }

    const forms = await prisma.form.findMany({
      where: { userId: user.id },
      include: { settings: true },
      orderBy: { createdAt: 'desc' },
    })

    return {
      success: true,
      message: 'Form fetched successfully',
      forms,
    }
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong.',
      error,
    }
  }
}

type SaveFormProps = {
  formId: string
  name?: string
  description?: string
  jsonBlocks: string
}

export async function saveForm({
  description,
  formId,
  name,
  jsonBlocks,
}: SaveFormProps) {
  try {
    const session = getKindeServerSession()
    const user = await session.getUser()

    if (!user) {
      return {
        success: false,
        message: 'Unauthorized to use this resource.',
      }
    }

    if (!formId || !jsonBlocks) {
      return {
        success: false,
        message: 'Invalid input data.',
      }
    }

    const form = await prisma.form.update({
      where: { formId },
      data: {
        name,
        description,
        jsonBlocks,
      },
    })

    return {
      success: true,
      message: 'Form updated successfully',
      form,
    }
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong.',
      error,
    }
  }
}

export async function updatePublish(formId: string, published: boolean) {
  try {
    const session = getKindeServerSession()
    const user = await session.getUser()

    if (!user) {
      return {
        success: false,
        message: 'Unauthorized to use this resource',
      }
    }

    if (!formId) {
      return {
        success: false,
        message: 'FormId is required',
      }
    }

    const form = await prisma.form.update({
      where: { formId },
      data: { published },
    })

    return {
      success: true,
      message: `Form successfully ${published ? 'published' : 'unpublished'}`,
      published: form.published,
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to update publish status',
    }
  }
}

export async function fetchPublishFormById(formId: string): Promise<{
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  form?: any //FormWithSettings | null;
  success: boolean
  message: string
}> {
  try {
    if (!formId) {
      return {
        success: false,
        message: 'FormId is required',
      }
    }
    const form = await prisma.form.findFirst({
      where: {
        formId: formId,
        published: true,
      },
      include: {
        settings: true,
      },
    })

    if (!form) {
      return {
        success: false,
        message: 'Form not found',
      }
    }

    return {
      success: true,
      message: 'Form fetched successfully',
      form,
    }
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong',
    }
  }
}

export async function submitResponse(formId: string, response: string) {
  try {
    if (!formId) {
      return {
        success: false,
        message: 'FormId is required',
      }
    }
    await prisma.form.update({
      where: {
        formId,
        published: true,
      },
      data: {
        formResponses: {
          create: {
            jsonResponse: response,
          },
        },
        responses: {
          increment: 1,
        },
      },
    })
    return {
      success: true,
      message: 'Response submitted',
    }
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong',
    }
  }
}

export async function fetchAllResponseByFormId(formId: string) {
  try {
    const session = getKindeServerSession()
    const user = await session.getUser()

    if (!user) {
      return {
        success: false,
        message: 'Unauthorized to use this resource',
      }
    }

    const form = await prisma.form.findUnique({
      where: {
        formId: formId,
      },
      include: {
        formResponses: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })

    return {
      success: true,
      message: 'Form fetched successfully',
      form,
    }
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong',
    }
  }
}

export async function countViews(formId: string) {
  try {
    if (!formId) {
      return {
        success: false,
        message: 'FormId is required',
      }
    }
    const form = await prisma.form.findFirst({
      where: {
        formId: formId,
        published: true,
      },
    })

    if (!form) {
      return {
        success: false,
        message: 'Form not found or unpublished',
      }
    }

    await prisma.formView.create({
      data: {
        formId: form.id,
      },
    })

    return {
      success: true,
      message: 'Response submitted',
    }
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong',
    }
  }
}
